import { Container } from '@/styles';
import { breakpointColumnObj } from '@/utils/helper';
import InfiniteScroll from 'react-infinite-scroll-component';
import MasonryGallery from '../MasonryGallery';
import Skeletons from '../Skeletons';
import { Gallery as GalleryWrapper } from './Gallery.styles';

const renderLoadingSkeletons = (isLoading: boolean) => {
  return isLoading ? <Skeletons count={12} /> : null;
};

const renderNoPhotosMessage = (photos: any[]) => {
  return photos?.length === 0 ? <div>No photos found</div> : null;
};

const renderGallery = (props: GalleryProps) => (
  <GalleryWrapper>
    <InfiniteScroll
      dataLength={props.photos?.length || 0}
      next={props.fetchNextPage}
      hasMore={props.hasMore}
      loader={props.isLoading ? <Skeletons count={3} /> : null}
    >
      <MasonryGallery
        photos={props.photos}
        breakpointColumnObj={breakpointColumnObj}
        handleOpenPhoto={props.handleOpenPhoto}
      />
    </InfiniteScroll>
  </GalleryWrapper>
);

const Gallery = (props: GalleryProps) => (
  <Container data-testid="gallery">
    {props.isInitialLoading
      ? renderLoadingSkeletons(true)
      : props.photos?.length === 0
      ? renderNoPhotosMessage(props.photos)
      : renderGallery(props)}
  </Container>
);

export default Gallery;
