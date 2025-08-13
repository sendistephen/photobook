import { useCallback, useMemo } from 'react';
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
  const handlePhotoClick = useCallback(
    (photo: Photo) => {
      handleOpenPhoto(photo, photos);
    },
    [handleOpenPhoto, photos]
  );

  const photoElements = useMemo(() => {
    return photos.map((photo, index) => {
      const isAboveFold = index < 6;
      
      return (
        <div
          key={`${photo.id}-${index}`}
          onClick={() => handlePhotoClick(photo)}
          style={{ cursor: 'pointer' }}
        >
          <Photo 
            photo={photo} 
            loading={isAboveFold ? 'eager' : 'lazy'}
            priority={isAboveFold}
          />
        </div>
      );
    });
  }, [photos, handlePhotoClick]);

  return (
    <StyledMasonry
      breakpointCols={breakpointColumnObj}
      className="my-masory-grid"
      columnClassName="my-masory-grid_column"
    >
      {photoElements}
    </StyledMasonry>
  );
};

export default MasonryGallery;
