import { showModal } from '@/store/modalSlice';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

export const useOpenModal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  return function openModal(
    photo: Photo | Collection,
    photos: Photo[] | Collection[],
  ) {
    navigate(`/photos/${photo.id}`, {
      state: { backgroundLocation: location },
    });
    dispatch(showModal({ photoId: photo.id, photos }));
  };
};
export default useOpenModal;
