import {
  createFetchData,
  createPhotoDataHook,
} from '@/components/Common/useCommonPhotoData';
import { useModalManagement } from '@/pages/Photos/useModalManagement';
import { fetchUserPhotos } from '@/store/userSlice';

const fetchData = createFetchData(
  fetchUserPhotos,
  (state) => state.user,
  'username',
);

export const useUserPhotos = createPhotoDataHook(
  fetchData,
  useModalManagement,
  (setPage) => ({
    loadMorePhotos: () => setPage((prevPage) => prevPage + 1),
    isBottomLoader: true,
  }),
);
