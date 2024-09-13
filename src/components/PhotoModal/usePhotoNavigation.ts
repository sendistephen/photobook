import useOpenModal from '@/components/PhotoModal/useOpenModal';
import { useNavigate } from 'react-router-dom';

export const usePhotoNavigation = (
  photos: (Photo | Collection)[] | undefined,
  selectedPhotoId: string | undefined,
) => {
  const openModal = useOpenModal();
  const navigate = useNavigate();

  const handleNavigation = (offset: number) => {
    const currentIndex = photos?.findIndex(p => p.id === selectedPhotoId);
    const newIndex = currentIndex !== undefined && currentIndex >= 0 ? currentIndex + offset : -1;
    const safePhotos = photos || [];
    const photo = newIndex >= 0 && newIndex < safePhotos.length ? safePhotos[newIndex] : null;
    if (photo) {
      navigate(`/photos/${photo.id}`, { replace: true });
      openModal(photo, photos as any);
    }
  };

  return { handleNavigation };
};