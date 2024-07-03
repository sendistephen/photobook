import { AppDispatch } from '@/store';
import { showModal } from '@/store/modalSlice';
import { generateSrcSet, imageSize } from '@/utils/helper';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Image, ImageWrapper } from './Gallery.styles';

interface PhotoProps {
  photo: Photo;
}

const Photo = ({ photo }: PhotoProps) => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const handleOpen = () => {
    navigate(`/photos/${photo.slug}`, { replace: true });
    dispatch(showModal(photo.id));
  };

  return (
    <ImageWrapper onClick={handleOpen}>
      <Image
        src={photo.urls.regular}
        alt={photo.alt_description}
        srcSet={generateSrcSet(photo)}
        sizes={imageSize}
      />
    </ImageWrapper>
  );
};

export default Photo;
