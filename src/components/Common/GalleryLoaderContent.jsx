import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { PhotoGallery } from '@/components/PhotoGallery';
import { Container, LoadingSpinner } from '@/styles';

import { EndMessage } from './EndMessage';

const InfinitePhotoGallery = (props) => (
  <InfiniteScroll
    dataLength={props.photos.length}
    next={props.fetchMorePhotos}
    hasMore={props.hasMore}
    loader={<LoadingSpinner />}
    endMessage={<EndMessage />}
  >
    <PhotoGallery
      photos={props.photos}
      isOpen={props.isOpen}
      openModal={props.openModal}
      closeModal={props.closeModal}
      selectedPhotoId={props.selectedPhotoId}
    />
  </InfiniteScroll>
);

export const GalleryLoaderContent = (props) => (
  <Container>
    {props.photos.length === 0 && props.isLoading ? (
      <LoadingSpinner isBottomLoader={props.isbottomloader} />
    ) : (
      <InfinitePhotoGallery
        photos={props.photos}
        fetchMorePhotos={props.fetchMorePhotos}
        hasMore={props.hasMore}
        isOpen={props.isOpen}
        openModal={props.openModal}
        closeModal={props.closeModal}
        selectedPhotoId={props.selectedPhotoId}
        isLoading={props.isLoading}
      />
    )}
  </Container>
);
