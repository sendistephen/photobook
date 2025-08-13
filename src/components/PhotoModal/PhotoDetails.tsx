import { useState, useRef, useEffect } from 'react';
import { generateSrcSet, imageSize, getImageSrc } from '@/utils/helper';
import { imageCache } from '@/utils/imageCache';
import {
  ImageContainer,
  PhotoContent,
  PhotoImage,
  TagContainer,
} from './PhotoModal.styles';
import { BlurPlaceholder, ImageContainer as GalleryImageContainer } from '../Gallery/Gallery.styles';
import PhotoPublicationInfo from './PhotoPublication';
import PhotoStats from './PhotoStatistics';
import { TagItem } from '@/styles/GlobalStyles';

interface PhotoDetailsProps {
  photo: Photo | null;
}

const PhotoDetails = ({ photo }: PhotoDetailsProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (photo) {
      const imageSrc = getImageSrc(photo.urls);
      if (imageCache.isImageCached(imageSrc)) {
        setImageLoaded(true);
      } else {
        // Preload the image
        imageCache.loadImage(imageSrc)
          .then(() => setImageLoaded(true))
          .catch(() => setImageError(true));
      }
    }
  }, [photo]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  if (!photo) return null;

  return (
    <>
      <ImageContainer>
        <GalleryImageContainer>
          {!imageLoaded && (
            <BlurPlaceholder
              style={{
                backgroundColor: photo.color || '#f0f0f0',
                aspectRatio: `${photo.width} / ${photo.height}`,
              }}
            />
          )}
          <PhotoImage
            ref={imgRef}
            src={imageError ? photo.urls.thumb : getImageSrc(photo.urls)}
            alt={photo.alt_description || 'Photo'}
            srcSet={!imageError ? generateSrcSet(photo) : undefined}
            sizes={imageSize}
            loading="eager"
            decoding="async"
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={{
              opacity: imageLoaded ? 1 : 0,
              transition: 'opacity 0.3s ease-in-out',
            }}
          />
        </GalleryImageContainer>
      </ImageContainer>
      <PhotoContent>
        <PhotoStats photo={photo} />
        <PhotoPublicationInfo photo={photo} />
        {photo.tags && photo.tags.length > 0 && (
          <TagContainer>
            {photo.tags.map((tag) => (
              <TagItem key={tag.title}>{tag.title}</TagItem>
            ))}
          </TagContainer>
        )}
      </PhotoContent>
    </>
  );
};

export default PhotoDetails;
