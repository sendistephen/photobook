import {
  createFetchData,
  createPhotoDataHook,
} from '@/components/Common/useCommonPhotoData';
import { useModalManagement } from '@/pages/Photos/useModalManagement';
import { getFavorites } from '@/store/favoritesSlice';

const fetchData = createFetchData(
  getFavorites,
  (state) => state.favorites,
  null,
);
export const useFavorites = createPhotoDataHook(
  fetchData,
  useModalManagement,
  () => ({
    loadMorePhotos: () => {}, //  no pagination for favorites
    isBottomLoader: true,
  }),
);
