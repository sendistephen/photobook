import InfiniteScroll from 'react-infinite-scroll-component';
import Skeletons from '../Skeletons';
import CollectionItem from './CollectionItem';
import { CollectionGrid } from './SearchCollections.styles';

const InfiniteCollectionScroll = ({
  collections,
  fetchNextPage,
  hasNextPage,
}: InfiniteCollectionScrollProps) => (
  <InfiniteScroll
    dataLength={collections.length}
    next={fetchNextPage}
    hasMore={!!hasNextPage}
    loader={<Skeletons count={3} />}
    endMessage={<p>There are no more photo collections to show.</p>}
  >
    <CollectionGrid>
      {collections.map((collection) => (
        <CollectionItem collection={collection} key={collection.id} />
      ))}
    </CollectionGrid>
  </InfiniteScroll>
);
export default InfiniteCollectionScroll;
