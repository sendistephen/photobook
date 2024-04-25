import InfiniteScroll from 'react-infinite-scroll-component';
import { Modal } from '@/components';
import React, { useEffect } from 'react';
import { breakpointColumns } from '@/utils/helper';
import {
  fetchCollection,
  openModal,
  clearUserCollection,
  fetchSingleCollection,
} from '@/store/collectionSlice';
import {
  Gallery,
  Wrapper,
  TagsWrapper,
  Image,
  ImageWrapper,
  StyledLink,
  Title,
  Tag,
  Stats,
} from '@/Collection.styles';
import {
  Container,
  GalleryImage,
  GalleryItem,
  LoadingSpinner,
  Message,
} from '@/styles';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoaderComponent from '@/components/LoaderComponent';

const Collection = (props) => {
  const { collectionId } = useParams();
  const dispatch = useDispatch();
  const { userPhotoCollection, collection, index, isLoading, hasMore } =
    useSelector((state) => state.collections);

  useEffect(() => {
    dispatch(fetchSingleCollection(collectionId));
    dispatch(fetchCollection({ collectionId }));
    return () => {
      dispatch(clearUserCollection());
    };
  }, [dispatch, collectionId]);

  const fetchMore = () => {
    dispatch(fetchCollection({ collectionId }));
  };

  return (
    <Container>
      {collection.user && (
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
      )}

      {userPhotoCollection.length === 0 && isLoading ? (
        <LoadingSpinner>
          <LoaderComponent />
        </LoadingSpinner>
      ) : (
        <InfiniteScroll
          dataLength={userPhotoCollection.length}
          next={fetchMore}
          hasMore={hasMore}
          loader={
            <LoadingSpinner>
              <LoaderComponent />
            </LoadingSpinner>
          }
          endMessage={
            <Message>
              <b>There are no more photos</b>
            </Message>
          }
        >
          <Gallery
            breakpointCols={breakpointColumns}
            columnClassName='masonry-grid_column'
          >
            {userPhotoCollection.map((photo, index) => (
              <GalleryItem
                key={`photo-${photo.slug}-${index}-${photo.id}`}
                onClick={() => dispatch(openModal(index))}
              >
                <GalleryImage src={photo.urls.small} alt={photo.description} />
              </GalleryItem>
            ))}
          </Gallery>
          {index > -1 && (
            <Modal
              photos={userPhotoCollection}
              index={index}
              hideModal={() => dispatch(openModal(-1))}
            />
          )}
        </InfiniteScroll>
      )}
    </Container>
  );
};

export default Collection;
