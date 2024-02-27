import Modal from 'components/Modal';
import { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams } from 'react-router-dom';
import {
  Container,
  GalleryImage,
  GalleryItem,
  LoadingSpinner,
  Message,
} from 'styles';
import { useDispatch, useSelector } from 'react-redux';
import { breakpointColumns } from 'utils/helper';
import { Gallery } from './SearchPhotos.styles';
import { fetchPhotos, handleModal, clearPhotos } from '../../store/searchSlice';
import LoaderComponent from 'components/LoaderComponent';

const SearchPhotos = (props) => {
  const { searchWord } = useParams();
  const dispatch = useDispatch();

  const { photos, hasMore, index } = useSelector((state) => state.search);

  useEffect(() => {
    dispatch(fetchPhotos(searchWord));
    return () => {
      dispatch(clearPhotos());
    };
  }, [dispatch, searchWord]);

  return (
    <Container>
      <InfiniteScroll
        dataLength={photos.length}
        next={() => props.fetchPhotos(searchWord)}
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
          columnClassName='masonry-grid_column'
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
