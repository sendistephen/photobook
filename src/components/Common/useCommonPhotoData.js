import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export const useCommonPhotoData = ({
  photos,
  hasMore,
  isLoading,
  fetchMorePhotos,
  loadMorePhotos,
  isbottomloader,
  openModal,
  closeModal,
  isOpen,
  selectedPhotoId,
}) => {
  return {
    photos,
    hasMore,
    isLoading,
    fetchMorePhotos,
    loadMorePhotos,
    isbottomloader,
    openModal,
    closeModal,
    isOpen,
    selectedPhotoId,
  };
};

export const createPhotoDataHook = (
  fetchData,
  modalManagement,
  loadMorePhotos,
) => {
  return () => {
    const data = fetchData();
    const modal = modalManagement();
    const loader = loadMorePhotos(data.setPage);

    return useCommonPhotoData({
      ...data,
      ...modal,
      loadMorePhotos: loader.loadMorePhotos,
      isbottomloader: loadMorePhotos.isbottomloader,
    });
  };
};

export const createFetchData = (
  fetchAction,
  stateSelector,
  identifierKey = 'id',
) => {
  return () => {
    const { [identifierKey]: identifier } = useParams() || {};
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const stateData = useSelector(stateSelector);

    useEffect(() => {
      if (identifier !== undefined) {
        dispatch(fetchAction({ [identifierKey]: identifier, page }));
      } else {
        dispatch(fetchAction({ page }));
      }
    }, [identifier, page, dispatch]);

    return { ...stateData, page, setPage };
  };
};
