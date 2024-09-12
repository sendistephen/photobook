import {
  addFavorite,
  removeFavorite,
} from '@/firebase/services/firebase-service';
import { QueryClient, useMutation, useQueryClient } from 'react-query';

type MutationContext = {
  previousFavorites: { pages: { favorites: Photo[] } }[] | undefined;
};

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

const createFavoriteMutation = (queryClient: QueryClient, mutationFn: any, handleFn: any) => {
  return useMutation(mutationFn, {
    onMutate: handleFn(queryClient),
    onError: (error, variables, context?: MutationContext) => { 
      queryClient.setQueryData('favorites', context?.previousFavorites);
    },
    onSettled: () => {
      queryClient.invalidateQueries('favorites');
    },
  });
};

const useAddFavoriteMutation = (queryClient: QueryClient) => {
  return createFavoriteMutation(queryClient, addFavorite, handleAddFavorite)
}

const useRemoveFavoriteMutation = (queryClient: QueryClient) => {
  return createFavoriteMutation(queryClient, removeFavorite, handleRemoveFavorite);
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
