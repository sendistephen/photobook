import { generateSrcSet, imageSize } from '@/utils/helper';
import {
  ImageContainer,
  PhotoContent,
  PhotoImage,
  TagContainer,
} from './PhotoModal.styles';
import PhotoPublicationInfo from './PhotoPublication';
import PhotoStats from './PhotoStatistics';
import { TagItem } from '@/styles/GlobalStyles';

interface PhotoDetailsProps {
  photo: Photo | null;
}

const PhotoDetails = ({ photo }: PhotoDetailsProps) => {
  return (
    <>
      <ImageContainer>
        <PhotoImage
          src={photo?.urls.small_s3}
          alt={photo?.alt_description}
          srcSet={generateSrcSet(photo as Photo)}
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
