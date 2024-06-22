import {
  createFetchData,
  createPhotoDataHook,
} from '../../components/Common/useCommonPhotoData';
import { fetchUserPhotos } from '../../store/userSlice';
import { useModalManagement } from '../Explore/useModalManagement';

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
