import LoaderComponent from '@/components/LoaderComponent';
import PhotoGallery from '@/components/PhotoGallery';
import { Container, LoadingSpinner } from '@/styles';

import {
  Image,
  ImageWrapper,
  Stats,
  StyledLink,
  Tag,
  TagsWrapper,
  Title,
  Wrapper,
} from './Collection.styles';
import { useCollection } from './useCollection';

const CollectionHeader = ({ collection }) => {
  if (!collection.user) return null;

  return (
    <Wrapper>
      <Title>#{collection.title}</Title>
      <TagsWrapper>
        {collection.tags.map((tag) => (
          <Tag key={tag.title}>{tag.title}</Tag>
        ))}
      </TagsWrapper>
      <ImageWrapper>
        <Image
          src={collection.user.profile_image.medium}
          alt={collection.user.username}
        />
        <StyledLink to={`/users/${collection.user.username}`}>
          {collection.user.username}
        </StyledLink>
      </ImageWrapper>
      <Stats>{collection.total_photos} photos</Stats>
    </Wrapper>
  );
};

const Collection = () => {
  const {
    userPhotoCollection,
    collection,
    isLoading,
    hasMore,
    fetchMore,
    isOpen,
    selectedPhotoId,
    openModal,
    closeModal,
  } = useCollection();

  return (
    <Container>
      <CollectionHeader collection={collection} />
      {userPhotoCollection.length === 0 && isLoading ? (
        <LoadingSpinner>
          <LoaderComponent />
        </LoadingSpinner>
      ) : (
        <PhotoGallery
          photos={userPhotoCollection}
          fetchMore={fetchMore}
          hasMore={hasMore}
          isOpen={isOpen}
          openModal={openModal}
          closeModal={closeModal}
          selectedPhotoId={selectedPhotoId}
        />
      )}
    </Container>
  );
};

export default Collection;
