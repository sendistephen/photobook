import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { hideModal, showModal } from '../../store/modalSlice';

export const useModalManagement = () => {
  const dispatch = useDispatch();
  const { isOpen, selectedPhotoId } = useSelector((state) => state.modal);

  useEffect(() => {
    return () => {
      dispatch(hideModal());
    };
  }, [dispatch]);

  const openModal = (photoId) => dispatch(showModal(photoId));
  const closeModal = () => dispatch(hideModal());

  return { isOpen, selectedPhotoId, openModal, closeModal };
};
