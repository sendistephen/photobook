import InfiniteScroll from 'react-infinite-scroll-component';
import { useLocation } from 'react-router-dom';
import { Message } from '../../styles';
import { Label } from '../PhotoModal/PhotoModal.styles';
import useSearch from '../SearchPhotos/useSearch';
import Skeletons from '../Skeletons';
import { default as Spinner } from '../Spinner';
import {
  CollectionCard,
  CollectionGrid,
  CollectionImage,
  CollectionInfo,
  StyledLink,
  Tag,
  TagContainer,
} from './SearchCollections.styles';

const SearchCollections = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query') ?? '';

  const { data, error, fetchNextPage, hasNextPage, isLoading } = useSearch(
    query,
    'collections',
  );

  if (isLoading) return <Spinner />;
  if (error) return <div>Error loading collections</div>;

  const allCollections = data!.pages.reduce<Collection[]>(
    (acc, page) => acc.concat(page.results as Collection[]),
    [],
  );

  return (
    <InfiniteScroll
      dataLength={allCollections.length}
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={<Skeletons count={3} />}
      endMessage={
        <Message>
          <b>There are no more photo collections to show.</b>
        </Message>
      }
    >
      <CollectionGrid>
        {allCollections.map((collection, index) => (
          <StyledLink
            to={`/collections/${collection.id}/${collection.title}`}
            key={collection.id + index}
          >
            <CollectionCard>
              <CollectionImage
                src={collection.cover_photo.urls.regular}
                alt={collection.description}
                loading="lazy"
              />
              <CollectionInfo>
                <Label size="md" weight="bold">
                  {collection.title}
                </Label>
                <Label color="textSecondary">
                  {collection.total_photos} images. Curated by{' '}
                  {collection.user.name}
                </Label>
                <TagContainer>
                  {collection.tags.slice(0, 4).map((tag, index) => (
                    <Tag key={tag.title + index}>{tag.title}</Tag>
                  ))}
                </TagContainer>
              </CollectionInfo>
            </CollectionCard>
          </StyledLink>
        ))}
      </CollectionGrid>
    </InfiniteScroll>
  );
};
export default SearchCollections;
