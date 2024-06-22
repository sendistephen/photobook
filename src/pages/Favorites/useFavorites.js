import {
  createFetchData,
  createPhotoDataHook,
} from '../../components/Common/useCommonPhotoData';
import { getFavorites } from '../../store/favoritesSlice';
import { useModalManagement } from '../Explore/useModalManagement';

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
