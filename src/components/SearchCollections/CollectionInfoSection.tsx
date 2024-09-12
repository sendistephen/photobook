import { Label } from '../PhotoModal/PhotoModal.styles';
import CollectionTags from './CollectionTags';
import { CollectionInfo } from './SearchCollections.styles';

const CollectionInfoSection = ({
  title,
  totalPhotos,
  userName,
  tags,
}: CollectionInfoSectionProps) => {
  return (
    <CollectionInfo>
      <Label size="md" weight="bold">
        {title}
      </Label>
      <Label color="textSecondary">
        {totalPhotos} images. Curated by {userName}
      </Label>
      <CollectionTags tags={tags} />
    </CollectionInfo>
  );
};
export default CollectionInfoSection;
