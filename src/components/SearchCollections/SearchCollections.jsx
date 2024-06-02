import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';

import LoaderComponent from '@/components/LoaderComponent';
import { Container, LoadingSpinner, Message } from '@/styles';
import { breakpointColumns } from '@/utils/helper';

import {
  CollectionImage,
  CollectionItem,
  Gallery,
  TotalPhotos,
} from './SearchCollections.styles';
import { useSearchCollection } from './useSearchCollection';

const SearchCollections = () => {
  const { collections, hasMore, fetchMoreCollections, isBottomLoader } =
    useSearchCollection();

  return (
    <Container>
      <InfiniteScroll
        key={Math.random()}
        dataLength={collections.length}
        next={fetchMoreCollections}
        hasMore={hasMore}
        loader={
          <LoadingSpinner className={isBottomLoader ? 'is-bottom-loader' : ''}>
            <LoaderComponent />
          </LoadingSpinner>
        }
        endMessage={
          <Message>
            <b>There are no more photo collections</b>
          </Message>
        }
      >
        <Gallery
          breakpointCols={breakpointColumns}
          columnClassName="masonry-grid_column"
        >
          {collections.map((collection, index) => (
            <Link
              key={`${collection.id}-${index}`}
              to={`/collections/${collection.id}/photos`}
            >
              <CollectionItem>
                <CollectionImage
                  src={collection.cover_photo.urls.small}
                  alt={collection.description}
                />
                <TotalPhotos>{collection.total_photos} photos</TotalPhotos>
              </CollectionItem>
            </Link>
          ))}
        </Gallery>
      </InfiniteScroll>
    </Container>
  );
};
export default SearchCollections;
