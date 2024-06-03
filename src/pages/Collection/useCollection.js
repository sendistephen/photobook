import { throttle } from 'lodash';

import {
  createFetchData,
  createPhotoDataHook,
} from '@/components/Common/useCommonPhotoData';
import { useModalManagement } from '@/pages/Photos/useModalManagement';
import { fetchCollection } from '@/store/collectionSlice';

const fetchData = createFetchData(
  fetchCollection,
  (state) => state.collections,
  'collectionId',
);

const loadMorePhotos = (setPage) => ({
  fetcMorePhotos: throttle(() => {
    setPage((prev) => prev + 1);
  }, 3000),
});

export const useCollection = createPhotoDataHook(
  fetchData,
  useModalManagement,
  loadMorePhotos,
);
