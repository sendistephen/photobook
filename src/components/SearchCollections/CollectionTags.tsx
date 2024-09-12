import { Tag, TagContainer } from './SearchCollections.styles';

const CollectionTags = ({ tags }: { tags: Tag[] }) => {
  return   <TagContainer>
  {tags.slice(0, 4).map((tag, index) => (
    <Tag key={tag.title + index}>{tag.title}</Tag>
  ))}
</TagContainer>
}
export default CollectionTags;