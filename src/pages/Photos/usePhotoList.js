import { createPhotoDataHook } from '@/components/Common/useCommonPhotoData';

import { useFetchPhotos } from './useFetchPhotos';
import { useModalManagement } from './useModalManagement';

const fetchData = useFetchPhotos;

export const usePhotoList = createPhotoDataHook(
  fetchData,
  useModalManagement,
  () => ({}),
);
