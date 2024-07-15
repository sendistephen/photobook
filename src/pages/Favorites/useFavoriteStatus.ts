import { useState } from 'react';
import useIsFavorited from './useIsFavorited';
import useToggleFavorite from './useToggleFavorite';

const useFavoriteStatus = (
  selectedPhotoId: string | undefined,
  photo: Photo | undefined,
) => {
  const [isFavorited, setIsFavorited] = useState(
    useIsFavorited(selectedPhotoId),
  );
  const toggleFavorite = useToggleFavorite(
    isFavorited,
    selectedPhotoId,
    photo,
    setIsFavorited,
  );

  return { isFavorited, toggleFavorite };
};
export default useFavoriteStatus;
