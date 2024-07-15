import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import usePhoto from './usePhoto';

const usePhotoModalStateManager = () => {
  const { photos, isOpen, selectedPhotoId } = useSelector(
    (state: RootState) => state.modal,
  );
  const { isLoading, isError, photo } = usePhoto(selectedPhotoId as string);

  if (isError) {
    return { error: true, isOpen: false };
  }
  if (!isOpen || !selectedPhotoId) {
    return { error: false, isOpen: false };
  }

  return {
    error: false,
    isOpen: true,
    selectedPhotoId,
    photos,
    isLoading,
    photo,
  };
};
export default usePhotoModalStateManager;
