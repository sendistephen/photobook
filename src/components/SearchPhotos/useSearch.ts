import { searchCollections, searchPhotos } from '@/api';
import { QueryFunctionContext, useInfiniteQuery } from 'react-query';

// Determines the appropriate fetch function based on type
const getFetchFunction = (type: 'photos' | 'collections') =>
  type === 'photos' ? searchPhotos : searchCollections;

// Fetching data for a page
const fetchDataForPage =
  (type: 'photos' | 'collections', query: string) =>
  ({ pageParam = 1 }: QueryFunctionContext<string[], any>) => {
    const fetchFunction = getFetchFunction(type);
    return fetchFunction(query, pageParam, 20);
  };

// Get next page parameter
const getNextPageParam = (lastPage: any, allPages: any) => {
  const nextPage = allPages.length + 1;
  return lastPage.total_pages >= nextPage ? nextPage : undefined;
};

// Custom hook to search photos or collections based on query
const useSearch = (query: string, type: 'photos' | 'collections') => {
  const fetchPage = fetchDataForPage(type, query);
  return useInfiniteQuery([type, query], fetchPage, { getNextPageParam });
};
export default useSearch;
