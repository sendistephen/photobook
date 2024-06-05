import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
  return (identifier) => {
    const [page, setPage] = useState(1);
    const data = fetchData(identifier, page);
    const modal = modalManagement();
    const loader = loadMorePhotos(setPage);

    return useCommonPhotoData({
      ...data,
      ...modal,
      loadMorePhotos: loader.loadMorePhotos,
      isbottomloader: loader.isbottomloader,
    });
  };
};

export const createFetchData = (
  fetchAction,
  stateSelector,
  identifierKey = 'id',
) => {
  return (identifier, page) => {
    const dispatch = useDispatch();
    const stateData = useSelector(stateSelector);

    useEffect(() => {
      if (identifier !== undefined) {
        dispatch(fetchAction({ [identifierKey]: identifier, page }));
      }
    }, [identifier, page, dispatch]);

    return { ...stateData };
  };
};
