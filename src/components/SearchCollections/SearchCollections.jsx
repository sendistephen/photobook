import { throttle } from 'lodash';
import { useCallback, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import LoaderComponent from '@/components/LoaderComponent';
import { clearCollections, fetchCollections } from '@/store/searchSlice';
import { Container, LoadingSpinner, Message } from '@/styles';
import { breakpointColumns } from '@/utils/helper';

import {
  CollectionImage,
  CollectionItem,
  Gallery,
  TotalPhotos,
} from './SearchCollections.styles';

const SearchCollections = () => {
  const { searchWord } = useParams(),
    dispatch = useDispatch(),
    isBottomLoader = true,
    { collections, hasMore, page } = useSelector((state) => state.search);

  useEffect(() => {
    if (searchWord) {
      dispatch(fetchCollections({ query: searchWord, page: 1, perPage: 30 }));
    }
    return () => {
      dispatch(clearCollections());
    };
  }, [dispatch, searchWord]);

  const fetchMoreCollections = useCallback(
    throttle(() => {
      const nextPage = page + 1;
      dispatch(
        fetchCollections({ query: searchWord, page: nextPage, perPage: 30 }),
      );
    }, 3000),
    [dispatch, searchWord, page],
  );

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
