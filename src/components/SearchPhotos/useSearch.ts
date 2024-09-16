import { search } from '@/api';
import { QueryFunctionContext, useInfiniteQuery } from 'react-query';


const fetchDataForPage =
  (type: 'photos' | 'collections', query: string) =>
  ({ pageParam = 1 }: QueryFunctionContext<string[], any>) => {
    return search(type,query,pageParam, 20)
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
