import { useState, useRef, useEffect } from 'react';
import { generateSrcSet, getImageSrc, imageSize } from '@/utils/helper';
import { imageCache } from '@/utils/imageCache';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { Image, ImageWrapper, BlurPlaceholder, ImageContainer } from './Gallery.styles';

interface PhotoProps {
  photo: Photo;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
}

const Photo = ({ photo, loading = 'lazy', priority = false }: PhotoProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);
  
  const { targetRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '100px',
    triggerOnce: true,
  });

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  useEffect(() => {
    if (priority) {
      setShouldLoad(true);
      if (imgRef.current) {
        const img = imgRef.current;
        if (img.complete && img.naturalWidth > 0) {
          setImageLoaded(true);
        }
      }
    } else if (isIntersecting && !shouldLoad) {
      setShouldLoad(true);
      const imageSrc = getImageSrc(photo.urls);
      
      // Use image cache for preloading
      imageCache.loadImage(imageSrc).catch(() => {
        // Fallback to direct loading if preload fails
      });
    }
  }, [priority, isIntersecting, shouldLoad, photo.urls]);

  useEffect(() => {
    const imageSrc = getImageSrc(photo.urls);
    if (imageCache.isImageCached(imageSrc)) {
      setImageLoaded(true);
    }
  }, [photo.urls]);

  return (
    <ImageWrapper ref={targetRef}>
      <ImageContainer>
        {!imageLoaded && (
          <BlurPlaceholder
            style={{
              backgroundColor: photo.color || '#f0f0f0',
              aspectRatio: `${photo.width} / ${photo.height}`,
            }}
          />
        )}
        {shouldLoad && (
          <Image
            ref={imgRef}
            src={imageError ? photo.urls.thumb : getImageSrc(photo.urls)}
            alt={photo.alt_description || 'Photo'}
            srcSet={!imageError ? generateSrcSet(photo) : undefined}
            sizes={imageSize}
            loading={loading}
            decoding="async"
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={{
              opacity: imageLoaded ? 1 : 0,
              transition: 'opacity 0.3s ease-in-out',
            }}
          />
        )}
      </ImageContainer>
    </ImageWrapper>
  );
};

export default Photo;
