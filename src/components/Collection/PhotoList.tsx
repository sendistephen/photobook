import { Photo, PhotoCard, PhotoGrid } from '@/components/User/user.styles';
import { getImageSrc } from '@/utils/helper';

const PhotoList = ({ photos, openModal }: { photos: Photo[]; openModal: (photo: Photo, photos: Photo[]) => void }) => (
    <PhotoGrid>
      {photos.map((photo, index) => (
        <PhotoCard key={photo.id + index}>
          <Photo
            onClick={() => openModal(photo, photos)}
            src={getImageSrc(photo.urls)}
            alt={photo.alt_description}
          />
        </PhotoCard>
      ))}
    </PhotoGrid>
  );

export default PhotoList;