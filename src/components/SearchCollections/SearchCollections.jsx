import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';

import { Container, LoadingSpinner, Message } from '../../styles';
import { breakpointColumnObj } from '../../utils/helper';

import LoaderComponent from '../Spinner';
import {
  CollectionImage,
  CollectionItem,
  Gallery,
  TotalPhotos,
} from './SearchCollections.styles';

const CollectionItemComponent = ({ collection }) => (
  <Link to={`/collections/${collection.id}/photos`}>
    <CollectionItem>
      <CollectionImage
        src={collection.cover_photo.urls.small}
        alt={collection.description}
      />
      <TotalPhotos>{collection.total_photos} photos</TotalPhotos>
    </CollectionItem>
  </Link>
);

const CollectionGallery = ({ collections }) => (
  <Gallery
    breakpointCols={breakpointColumnObj}
    columnClassName="masonry-grid_column"
  >
    {collections.map((collection, index) => (
      <CollectionItemComponent
        key={`${collection.id}-${index}`}
        collection={collection}
      />
    ))}
  </Gallery>
);

const SearchCollections = () => {
  const collections = [];
  const hasMore = true;
  const fetchMoreCollections = () => {
    return;
  };
  const isBottomLoader = false;

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
        <CollectionGallery collections={collections} />
      </InfiniteScroll>
    </Container>
  );
};
export default SearchCollections;
