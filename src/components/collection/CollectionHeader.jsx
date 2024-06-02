import {
  Image,
  ImageWrapper,
  Stats,
  StyledLink,
  Tag,
  TagsWrapper,
  Title,
  Wrapper,
} from '@/pages/Collection/Collection.styles';

export const CollectionHeader = ({ collection }) => {
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
