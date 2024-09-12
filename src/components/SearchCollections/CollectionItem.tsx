import CollectionImageSection from './CollectionImageSection';
import CollectionInfoSection from './CollectionInfoSection';
import { CollectionCard, StyledLink } from './SearchCollections.styles';

const CollectionItem = ({ collection }: { collection: Collection }) => {
  return (
    <StyledLink to={`/collections/${collection.id}/${collection.title}`}>
      <CollectionCard>
        <CollectionImageSection
          src={collection.cover_photo.urls.regular}
          alt={collection.description}
        />
        <CollectionInfoSection
          title={collection.title}
          totalPhotos={collection.total_photos}
          userName={collection.user.name}
          tags={collection.tags}
        />
      </CollectionCard>
    </StyledLink>
  );
};
export default CollectionItem;
