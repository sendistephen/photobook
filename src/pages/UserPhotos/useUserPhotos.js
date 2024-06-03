import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useCommonPhotoData } from '@/components/Common/useCommonPhotoData';
import { useModalManagement } from '@/pages/Photos/useModalManagement';
import { fetchUserPhotos } from '@/store/userSlice';
import { useLoadMorePhotos } from '@/useLoadMorePhotos';

const useFetchUserPhotos = (page) => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const { photos, hasMore, isLoading } = useSelector((state) => state.user);

  useEffect(() => {
    if (username) {
      dispatch(fetchUserPhotos({ username, page }));
    }
  }, [username, page, dispatch]);

  return { photos, hasMore, isLoading };
};

export const useUserPhotos = () => {
  const [page, setPage] = useState(1);
  const { photos, hasMore, isLoading } = useFetchUserPhotos(page);
  const { isOpen, selectedPhotoId, openModal, closeModal } =
    useModalManagement();
  const isbottomloader = true;
  const loadMorePhotos = useLoadMorePhotos(setPage);

  return useCommonPhotoData({
    photos,
    hasMore,
    isLoading,
    loadMorePhotos,
    isbottomloader,
    openModal,
    closeModal,
    isOpen,
    selectedPhotoId,
  });
};
