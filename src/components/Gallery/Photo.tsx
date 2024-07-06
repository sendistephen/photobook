import { generateSrcSet, getImageSrc, imageSize } from '@/utils/helper';
import { Image, ImageWrapper } from './Gallery.styles';

interface PhotoProps {
  photo: Photo;
}

const Photo = ({ photo }: PhotoProps) => {
  return (
    <ImageWrapper>
      <Image
        src={getImageSrc(photo.urls)}
        alt={photo.alt_description}
        srcSet={generateSrcSet(photo)}
        sizes={imageSize}
      />
    </ImageWrapper>
  );
};

export default Photo;
