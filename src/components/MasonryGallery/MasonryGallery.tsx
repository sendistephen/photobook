import { StyledMasonry } from '../Gallery/Gallery.styles';
import Photo from '../Gallery/Photo';

interface MasonryGalleryProps {
  photos: Photo[];
  breakpointColumnObj: any;
  handleOpenPhoto: (photo: Photo, photos: Photo[]) => void;
}

const MasonryGallery = ({
  photos,
  breakpointColumnObj,
  handleOpenPhoto,
}: MasonryGalleryProps) => {
  return (
    <StyledMasonry
      breakpointCols={breakpointColumnObj}
      className="my-masory-grid"
      columnClassName="my-masory-grid_column"
    >
      {photos.map((photo, index) => (
        <div
          key={`${photo.id}-${index}`}
          onClick={() => handleOpenPhoto(photo, photos)}
        >
          <Photo photo={photo} />
        </div>
      ))}
    </StyledMasonry>
  );
};

export default MasonryGallery;
