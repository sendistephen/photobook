import { Modal } from '../components';
import { Gallery } from '../pages/Collection/Collection.styles';
import { GalleryImage, GalleryItem } from '../styles';
import { breakpointColumnObj } from '../utils/helper';

export const PhotoGallery = ({
  photos,
  openModal,
  isOpen,
  selectedPhotoId,
  closeModal,
}) => (
  <Gallery
    breakpointCols={breakpointColumnObj}
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

    {isOpen && (
      <Modal
        photos={photos}
        selectedPhotoId={selectedPhotoId}
        hideModal={closeModal}
      />
    )}
  </Gallery>
);
