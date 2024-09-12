import {
  addFavorite,
  removeFavorite,
} from '@/firebase/services/firebase-service';
import { QueryClient, useMutation, useQueryClient } from 'react-query';

const handleAddFavorite = (queryClient: QueryClient) => async (newPhoto: Photo) => {
  await queryClient.cancelQueries('favorites');

  const previousFavorites = queryClient.getQueryData<{
    pages: { favorites: Photo[] }[];
  }>('favorites');

  queryClient.setQueryData<{ pages: { favorites: Photo[] }[] } | undefined>(
    'favorites',
    (old) => {
      if (!old) {
        return { pages: [{ favorites: [newPhoto] }] };
      }
      const newPages = [...old.pages];
      newPages[0].favorites = [newPhoto, ...newPages[0].favorites];
      return { ...old, pages: newPages };
    },
  );

  return { previousFavorites };
};


const handleRemoveFavorite = (queryClient: QueryClient) => async (photoId: string) => {
  await queryClient.cancelQueries('favorites');

  const previousFavorites = queryClient.getQueryData<{
    pages: { favorites: Photo[] }[];
  }>('favorites');

  queryClient.setQueryData<{ pages: { favorites: Photo[] }[] } | undefined>(
    'favorites',
    (old) => {
      if (!old) {
        return old;
      }
      const newPages = old.pages.map((page) => ({
        favorites: page.favorites.filter((photo) => photo.id !== photoId),
      }));
      return { ...old, pages: newPages };
    },
  );

  return { previousFavorites };
};

const useAddFavoriteMutation = (queryClient: QueryClient) => {
  return useMutation(addFavorite, {
    onMutate: handleAddFavorite(queryClient),
    onError: (error, newPhoto, context) => {
      queryClient.setQueryData('favorites', context?.previousFavorites);
    },
    onSettled: () => {
      queryClient.invalidateQueries('favorites');
    },
  });
};


const useRemoveFavoriteMutation = (queryClient: QueryClient) => {
  return useMutation(removeFavorite, {
    onMutate: handleRemoveFavorite(queryClient),
    onError: (error, photoId, context) => {
      queryClient.setQueryData('favorites', context?.previousFavorites);
    },
    onSettled: () => {
      queryClient.invalidateQueries('favorites');
    },
  });
};


/**
 * Hook to add or remove a photo from the user's favorites
 * @returns The function to add or remove a photo from the user's favorites
 * based on the provided photo id
 */
const useFavoriteMutation = () => {
  const queryClient = useQueryClient();
  const addMutation = useAddFavoriteMutation(queryClient);
  const removeMutation = useRemoveFavoriteMutation(queryClient);
  return { addMutation, removeMutation };
};

export default useFavoriteMutation;
