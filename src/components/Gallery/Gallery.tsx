import { Container } from '@/styles';
import { breakpointColumnObj } from '@/utils/helper';
import InfiniteScroll from 'react-infinite-scroll-component';
import MasonryGallery from '../MasonryGallery';
import Skeletons from '../Skeletons';
import { Gallery as GalleryWrapper } from './Gallery.styles';

const Gallery = (props: GalleryProps) => {
  return (
    <Container data-testid="gallery">
      {props.isInitialLoading ? (
        <Skeletons count={12} />
      ) : props.photos.length === 0 ? (
        <div>No photos found</div>
      ) : (
        <GalleryWrapper>
          <InfiniteScroll
            dataLength={props.photos.length}
            next={props.fetchNextPage}
            hasMore={props.hasMore}
            loader={props.isLoading ? <Skeletons count={3} /> : null}
          >
            <MasonryGallery
              photos={props.photos}
              breakpointColumnObj={breakpointColumnObj}
            />
          </InfiniteScroll>
        </GalleryWrapper>
      )}
    </Container>
  );
};

export default Gallery;
