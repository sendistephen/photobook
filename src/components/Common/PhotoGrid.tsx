import InfiniteScroll from 'react-infinite-scroll-component';
import {
  Photo,
  PhotoCard,
  PhotoGrid as StyledPhotoGrid,
} from '@/components/User/user.styles';
import Skeletons from '../Skeletons';
import { imageExtractor } from '@/utils/helper';

interface PhotoGridProps {
  photos: Photo[] | Collection[];
  fetchNextPage: () => void;
  hasMore: boolean;
  openModal: (photo: any, photos: any[]) => void;
  imageExtractor: (item: Photo | Collection) => string | null;
}

export const PhotoGrid = (props: PhotoGridProps) => (
  <InfiniteScroll
    dataLength={props.photos.length}
    next={props.fetchNextPage}
    hasMore={props.hasMore}
    loader={<Skeletons count={3} />}
    endMessage={<p>No more photos</p>}
  >
    <StyledPhotoGrid>
      {props.photos.map((item, index) =>
        imageExtractor(item) ? (
          <PhotoCard key={item.id + index}>
            <Photo
              onClick={() => props.openModal(item, props.photos)}
              src={imageExtractor(item) as string}
              alt={item.description || 'Photo'}
            />
          </PhotoCard>
        ) : null,
      )}
    </StyledPhotoGrid>
  </InfiniteScroll>
);
