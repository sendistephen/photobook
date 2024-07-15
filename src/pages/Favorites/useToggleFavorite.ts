import toast from 'react-hot-toast';
import useFavoriteMutation from './useFavoriteMutation';

const useToggleFavorite = (
  isFavorited: boolean,
  selectedPhotoId: string | undefined,
  photo: Photo | undefined,
  setIsFavorited: (value: boolean) => void,
) => {
  const { addMutation, removeMutation } = useFavoriteMutation();

  const toggleFavorite = () => {
    if (isFavorited) {
      removeMutation.mutate(selectedPhotoId!);
      toast.success('Removed from favorites');
    } else {
      addMutation.mutate(photo!);
      toast.success('Added to favorites');
    }
    setIsFavorited(!isFavorited); // optimistically update isFavorited
  };

  return toggleFavorite;
};
export default useToggleFavorite;
