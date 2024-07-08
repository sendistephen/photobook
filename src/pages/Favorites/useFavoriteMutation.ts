import {
  addFavorite,
  removeFavorite,
} from '@/firebase/services/firebase-service';
import { useMutation, useQueryClient } from 'react-query';

/**
 * Hook to add or remove a photo from the user's favorites
 * @returns The function to add or remove a photo from the user's favorites
 * based on the provided photo id
 */
const useFavoriteMutation = () => {
  const queryClient = useQueryClient();

  const addMutation = useMutation(addFavorite, {
    onMutate: async (newPhoto) => {
      await queryClient.cancelQueries('favorites');

      const previousFavorites = queryClient.getQueryData<{
        pages: { favorites: Photo[] }[];
      }>('favorites');

      queryClient.setQueryData<{ pages: { favorites: Photo[] }[] } | undefined>(
        'favorites',
        (old) => {
          // Handling undefined old data
          if (!old) {
            return { pages: [{ favorites: [newPhoto] }] };
          }
          const newPages = [...old.pages];
          newPages[0].favorites = [newPhoto, ...newPages[0].favorites];
          return { ...old, pages: newPages };
        },
      );

      return { previousFavorites };
    },
    onError: (error, newPhoto, context) => {
      // reverting to previous state in case of error
      queryClient.setQueryData('favorites', context?.previousFavorites);
    },
    onSettled: () => {
      queryClient.invalidateQueries('favorites');
    },
  });

  const removeMutation = useMutation(removeFavorite, {
    onMutate: async (photoId) => {
      await queryClient.cancelQueries('favorites');

      const previousFavorites = queryClient.getQueryData<{
        pages: { favorites: Photo[] }[];
      }>('favorites');

      queryClient.setQueryData<{ pages: { favorites: Photo[] }[] } | undefined>(
        'favorites',
        (old) => {
          // Handling undefined old data
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
    },
    onError: (error, photoId, context) => {
      queryClient.setQueryData('favorites', context?.previousFavorites);
    },
    onSettled: () => {
      queryClient.invalidateQueries('favorites');
    },
  });
  return { addMutation, removeMutation };
};

export default useFavoriteMutation;
