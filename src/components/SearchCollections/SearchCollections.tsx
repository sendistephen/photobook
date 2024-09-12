import { default as Spinner } from '../Spinner';
import InfiniteCollectionScroll from './InfiniteCollectionScroll';
import useCollectionSearch from './useCollectionSearch';

const SearchCollections = () => {
  const { data, error, fetchNextPage, hasNextPage, isLoading } =
    useCollectionSearch();

  if (isLoading) return <Spinner />;
  if (error) return <div>Error loading collections</div>;

  const allCollections = data!.pages.reduce<Collection[]>(
    (acc, page) => acc.concat(page.results as Collection[]),
    [],
  );

  return (
    <InfiniteCollectionScroll
      collections={allCollections}
      fetchNextPage={fetchNextPage}
      hasNextPage={!!hasNextPage}
    />
  );
};
export default SearchCollections;
