import { generateSrcSet, imageSize } from '@/utils/helper';
import {
  ImageContainer,
  PhotoContent,
  PhotoImage,
  TagContainer,
  TagItem,
} from './PhotoModal.styles';
import PhotoPublicationInfo from './PhotoPublication';
import PhotoStats from './PhotoStatistics';

interface PhotoDetailsProps {
  photo: Photo | null;
}

const PhotoDetails = ({ photo }: PhotoDetailsProps) => {
  return (
    <>
      <ImageContainer>
        <PhotoImage
          src={photo?.urls.regular}
          alt={photo?.alt_description}
          srcSet={generateSrcSet(photo)}
          sizes={imageSize}
          loading="lazy"
        />
      </ImageContainer>
      <PhotoContent>
        <PhotoStats photo={photo} />
        <PhotoPublicationInfo photo={photo} />
        <TagContainer>
          {photo?.tags.map((tag) => (
            <TagItem key={tag.title}>{tag.title}</TagItem>
          ))}
        </TagContainer>
      </PhotoContent>
    </>
  );
};
export default PhotoDetails;
