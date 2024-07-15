import { useEffect, useState } from 'react';
import useFavorites from './useFavorites';

const useIsFavorited = (selectedPhotoId: string | undefined) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const { favorites } = useFavorites();

  useEffect(() => {
    const favoriteStatus = favorites.some((p) => p.id === selectedPhotoId);
    setIsFavorited(favoriteStatus);
  }, [selectedPhotoId, favorites]);

  return isFavorited;
};

export default useIsFavorited;
