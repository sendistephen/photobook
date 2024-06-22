import { StyledMasonry } from '../Gallery/Gallery.styles';
import Photo from '../Gallery/Photo';

interface MasonryGalleryProps {
  photos: Photo[];
  breakpointColumnObj: any;
}

const MasonryGallery = ({
  photos,
  breakpointColumnObj,
}: MasonryGalleryProps) => {
  return (
    <StyledMasonry
      breakpointCols={breakpointColumnObj}
      className="my-masory-grid"
      columnClassName="my-masory-grid_column"
    >
      {photos.map((photo, index) => (
        <Photo key={`${photo.id}-${index}`} photo={photo} />
      ))}
    </StyledMasonry>
  );
};

export default MasonryGallery;
