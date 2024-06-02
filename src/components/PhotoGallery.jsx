import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { Modal } from '@/components';
import LoaderComponent from '@/components/LoaderComponent';
import { Gallery } from '@/pages/Collection/Collection.styles';
import { GalleryImage, GalleryItem, LoadingSpinner, Message } from '@/styles';
import { breakpointColumns } from '@/utils/helper';

const PhotoGallery = ({
  photos,
  fetchMore,
  hasMore,
  openModal,
  isOpen,
  selectedPhotoId,
  closeModal,
}) => (
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
      {photos.map((photo, idx) => (
        <GalleryItem
          key={`${photo.id}-${idx}`}
          onClick={() => openModal(photo.id)}
        >
          <GalleryImage src={photo.urls.small} alt={photo.description} />
        </GalleryItem>
      ))}
    </Gallery>
    {isOpen && (
      <Modal
        photos={photos}
        selectedPhotoId={selectedPhotoId}
        hideModal={closeModal}
      />
    )}
  </InfiniteScroll>
);

export default PhotoGallery;
