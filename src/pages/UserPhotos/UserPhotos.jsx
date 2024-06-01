import InfiniteScroll from 'react-infinite-scroll-component';

import LoaderComponent from '@/components/LoaderComponent';
import Modal from '@/components/Modal';
import { hideModal, openModal } from '@/store/userSlice';
import {
  GalleryImage,
  GalleryItem,
  LoadingSpinner,
  Message,
  StyledMasonry,
} from '@/styles';
import { breakpointColumns } from '@/utils/helper';

import useUserPhotos from './useUserPhotos';

const UserPhotos = () => {
  const {
    photos,
    hasMore,
    selectedPhotoId,
    loadMorePhotos,
    isBottomLoader,
    dispatch,
  } = useUserPhotos();

  if (photos.length === 0) {
    return <Message>No photos available.</Message>;
  }

  return (
    <div>
      {photos.length > 0 && (
        <InfiniteScroll
          dataLength={photos.length}
          next={loadMorePhotos}
          hasMore={hasMore}
          loader={
            <LoadingSpinner
              className={isBottomLoader ? 'is-bottom-loader' : ''}
            >
              <LoaderComponent />
            </LoadingSpinner>
          }
          endMessage={
            <Message>
              <p>There are no more photos</p>
            </Message>
          }
        >
          <StyledMasonry
            breakpointCols={breakpointColumns}
            columnClassName="masonry-grid_column"
          >
            {photos.map((photo) => (
              <GalleryItem
                key={photo.id}
                onClick={() => dispatch(openModal(photo.id))}
              >
                <GalleryImage src={photo.urls.small} alt={photo.description} />
              </GalleryItem>
            ))}
          </StyledMasonry>
          {selectedPhotoId && (
            <Modal
              selectedPhotoId={selectedPhotoId}
              photos={photos}
              hideModal={() => dispatch(hideModal())}
            />
          )}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default UserPhotos;
