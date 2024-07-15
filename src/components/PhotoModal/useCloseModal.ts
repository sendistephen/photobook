import { hideModal } from '@/store/modalSlice';
import { useDispatch } from 'react-redux';

const useCloseModal = () => {
  const dispatch = useDispatch();

  return () => {
    dispatch(hideModal());
  };
};

export default useCloseModal;
