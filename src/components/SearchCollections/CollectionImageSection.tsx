import { CollectionImage } from './SearchCollections.styles';

const CollectionImageSection = ({ src, alt }: { src: string; alt: string }) => (
  <CollectionImage src={src} alt={alt} loading="lazy" />
);
export default CollectionImageSection;
