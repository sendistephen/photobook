import { searchCollections, searchPhotos } from '@/api';
import { QueryFunctionContext, useInfiniteQuery } from 'react-query';

const getFetchFunction = (type: 'photos' | 'collections') =>
  type === 'photos' ? searchPhotos : searchCollections;

const fetchDataForPage =
  (type: 'photos' | 'collections', query: string) =>
  ({ pageParam = 1 }: QueryFunctionContext<string[], any>) => {
    const fetchFunction = getFetchFunction(type);
    return fetchFunction(query, pageParam, 20);
  };

const getNextPageParam = (lastPage: any, allPages: any) => {
  const nextPage = allPages.length + 1;
  return lastPage.total_pages >= nextPage ? nextPage : undefined;
};

const useSearch = (query: string, type: 'photos' | 'collections') => {
  const fetchPage = fetchDataForPage(type, query);
  return useInfiniteQuery([type, query], fetchPage, { getNextPageParam });
};
export default useSearch;
