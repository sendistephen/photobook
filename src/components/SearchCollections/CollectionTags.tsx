import { Tag, TagsContainer } from "@/styles/GlobalStyles";

const CollectionTags = ({ tags }: { tags: Tag[] }) => {
  return   <TagsContainer>
  {tags.slice(0, 4).map((tag, index) => (
    <Tag key={tag.title + index}>{tag.title}</Tag>
  ))}
</TagsContainer>
}
export default CollectionTags;