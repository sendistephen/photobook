import { throttle } from 'lodash';
import { useCallback } from 'react';

export const useLoadMorePhotos = (setPage) => {
  return useCallback(
    throttle(() => {
      setPage((prevPage) => prevPage + 1);
    }, 3000),
    [],
  );
};
