import useOpenModal from '@/components/PhotoModal/useOpenModal';
import { useNavigate } from 'react-router-dom';


/** Helper function to find the current index of the selected photo */
const findCurrentPhotoIndex = (
  photos: (Photo | Collection)[] | undefined,
  photoId: string | undefined
) => {
  return photos?.findIndex(p => p.id === photoId) ?? -1;
}

/** Helper function to get the next photo based on the offset */
const getNextPhoto = (
  photos: (Photo | Collection)[],
  currentIndex: number,
  offset: number
) => {
  const newIndex = currentIndex + offset;
  return newIndex >= 0 && newIndex < photos.length ? photos[newIndex] : null;
}
  

export const usePhotoNavigation = (
  photos: (Photo | Collection)[] | undefined,
  selectedPhotoId: string | undefined,
) => {
  const openModal = useOpenModal();
  const navigate = useNavigate();

  const handleNavigation = (offset: number) => {
    if (!photos || !selectedPhotoId) return;

    const currentIndex = findCurrentPhotoIndex(photos, selectedPhotoId);
    const nextPhoto = getNextPhoto(photos, currentIndex, offset);
    if (nextPhoto) {
      navigate(`/photos/${nextPhoto.id}`, { replace: true });
      openModal(nextPhoto, photos as any);
    }
  };

  return { handleNavigation };
};