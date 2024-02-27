import { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, LoadingSpinner, Message } from 'styles';
import { breakpointColumns } from 'utils/helper';
import {
  clearUserCollection,
  fetchCollections,
} from '../../store/collectionSlice';
import {
  CollectionImage,
  CollectionItem,
  Gallery,
  TotalPhotos,
} from './SearchCollections.styles';

import { useParams } from 'react-router-dom';
import LoaderComponent from 'components/LoaderComponent';

const SearchCollections = (props) => {
  const { searchWord } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCollections({ query: searchWord, page: 1, perPage: 30 }));
    return () => {
      dispatch(clearUserCollection());
    };
  }, [dispatch, searchWord]);

  const { collections, hasMore } = props.collections;

  return (
    <Container>
      <InfiniteScroll
        dataLength={collections.length}
        next={() => props.fetchCollections(searchWord)}
        hasMore={hasMore}
        loader={
          <LoadingSpinner>
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
          columnClassName='masonry-grid_column'
        >
          {collections.map((collection) => (
            <Link
              key={collection.id}
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
