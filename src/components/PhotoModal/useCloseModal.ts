import { hideModal } from '@/store/modalSlice';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

interface LocationState {
  backgroundLocation?: string;
}

const useCloseModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation() as unknown as { state: LocationState };

  return () => {
    const backgroundLocation = location.state?.backgroundLocation || '/';
    console.log(backgroundLocation);
    navigate(backgroundLocation);
    dispatch(hideModal());
  };
};

export default useCloseModal;
