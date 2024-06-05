import { throttle } from 'lodash';
import { useCallback } from 'react';

export const usePagination = (setPage) => {
  return useCallback(
    throttle(() => {
      setPage((prevPage) => prevPage + 1);
    }, 3000),
    [],
  );
};
