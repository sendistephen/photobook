// usePhotoNavigation.ts
import useOpenModal from '@/components/PhotoModal/useOpenModal';
import { useNavigate } from 'react-router-dom';

const usePhotoNavigation = (
  photos: (Photo | Collection)[] | undefined,
  selectedPhotoId: string | undefined,
) => {
  const openModal = useOpenModal();
  const navigate = useNavigate();

  const handleNavigation = (offset: number) => {
    if (!photos || !selectedPhotoId) return;

    const currentIndex = photos.findIndex((p) => p.id === selectedPhotoId);
    const newIndex = currentIndex + offset;

    if (newIndex >= 0 && newIndex < photos.length) {
      const newPhoto = photos[newIndex]; // Get the full photo or collection object
      navigate(`/photos/${newPhoto.id}`, { replace: true });
      openModal(newPhoto, photos as any);
    }
  };

  return { handleNavigation };
};

export default usePhotoNavigation;
