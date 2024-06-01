import { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import LoaderComponent from '@/components/LoaderComponent';
import Modal from '@/components/Modal';
import { clearPhotos, fetchPhotos, handleModal } from '@/store/searchSlice';
import {
  Container,
  GalleryImage,
  GalleryItem,
  LoadingSpinner,
  Message,
} from '@/styles';
import { breakpointColumns } from '@/utils/helper';

import { Gallery } from './SearchPhotos.styles';

const SearchPhotos = () => {
  const { searchWord } = useParams(),
    dispatch = useDispatch(),
    { photos, hasMore, index } = useSelector((state) => state.search);

  useEffect(() => {
    if (searchWord) {
      dispatch(fetchPhotos({ query: searchWord }));
    }

    return () => {
      dispatch(clearPhotos());
    };
  }, [dispatch, searchWord]);

  const fetchMore = () => {
    dispatch(fetchPhotos(searchWord));
  };

  return (
    <Container>
      <InfiniteScroll
        dataLength={photos.length}
        next={fetchMore}
        hasMore={hasMore}
        loader={
          <LoadingSpinner>
            <LoaderComponent />
          </LoadingSpinner>
        }
        endMessage={
          <Message>
            <b>There are no more photos</b>
          </Message>
        }
      >
        <Gallery
          breakpointCols={breakpointColumns}
          columnClassName="masonry-grid_column"
        >
          {photos.map((photo, index) => (
            <GalleryItem
              key={photo.id}
              onClick={() => dispatch(handleModal(index))}
            >
              <GalleryImage src={photo.urls.small} alt={photo.description} />
            </GalleryItem>
          ))}
        </Gallery>
        {index > -1 && (
          <Modal
            photos={photos}
            index={index}
            hideModal={() => dispatch(handleModal(-1))}
          />
        )}
      </InfiniteScroll>
    </Container>
  );
};

export default SearchPhotos;
