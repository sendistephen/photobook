import { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, LoadingSpinner, Message } from 'styles';
import { breakpointColumns } from 'utils/helper';

import {
  CollectionImage,
  CollectionItem,
  Gallery,
  TotalPhotos,
} from './SearchCollections.styles';

import { useParams } from 'react-router-dom';
import LoaderComponent from 'components/LoaderComponent';
import { fetchCollections, clearCollections } from 'store/searchSlice';

const SearchCollections = () => {
  const { searchWord } = useParams();
  const dispatch = useDispatch();
  const isBottomLoader = true;

  const { collections, hasMore, page } = useSelector((state) => state.search);

  useEffect(() => {
    if (searchWord) {
      dispatch(fetchCollections({ query: searchWord, page: 1, perPage: 30 }));
    }
    return () => {
      dispatch(clearCollections());
    };
  }, [dispatch, searchWord]);

  const fetchMoreCollections = () => {
    // Increment the page number for the next fetch
    const nextPage = page + 1;
    dispatch(
      fetchCollections({ query: searchWord, page: nextPage, perPage: 30 })
    );
  };

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
