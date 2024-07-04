import { showModal } from '@/store/modalSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const useOpenModal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return function openModal(photo: Photo, photos: Photo[]) {
    navigate(`/photos/${photo.id}`, { replace: true });
    dispatch(showModal({ photoId: photo.id, photos }));
  };
};
export default useOpenModal;
