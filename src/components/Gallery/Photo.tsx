import { Image, ImageWrapper } from './Gallery.styles';

interface PhotoProps {
  photo: Photo;
}

const Photo = ({ photo }: PhotoProps) => {
  return (
    <ImageWrapper>
      <Image src={photo.urls.thumb} alt={photo.alt_description} />
    </ImageWrapper>
  );
};

export default Photo;
