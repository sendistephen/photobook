import Loader from 'react-loader-spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Modal } from 'components';
import React, { Component } from 'react';
import { breakpointColumns } from 'utils/helper';
import {
  fetchCollection,
  fetechSingleCollection,
  handleModal,
  clearCollection,
} from 'store/collections/collectionsActions';
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
} from './Collection.styles';
import {
  Container,
  GalleryImage,
  GalleryItem,
  LoadingSpinner,
  Message,
} from 'styles';
import { connect } from 'react-redux';

class Collection extends Component {
  componentDidMount = () => {
    const { collectionId } = this.props.match.params;
    this.props.fetchCollection(collectionId);
    this.props.fetechSingleCollection(collectionId);
  };
  // TODO: update state whenever props a component updates->clear prevState and update
  componentDidUpdate = (prevProps, prevState) => {
    const { collectionId } = this.props.match.params;

    if (
      prevProps.match.params.collectionId !==
      this.props.match.params.collectionId
    ) {
      this.props.fetchPhotos(collectionId);
    }
  };
  componentWillUnmount() {
    this.props.clearCollection();
  }
  render() {
    const { userPhotoCollection, collection, index, isLoading, hasMore } =
      this.props.collections;

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

        {isLoading && (
          <LoadingSpinner>
            <Loader type='ThreeDots' color='#32D3AC' />
          </LoadingSpinner>
        )}

        <InfiniteScroll
          dataLength={userPhotoCollection.length}
          next={this.props.fetchCollection}
          hasMore={hasMore}
          loader={
            <LoadingSpinner>
              <Loader type='ThreeDots' color='#32D3AC' />
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
              <GalleryItem key={photo.id}>
                <GalleryImage
                  src={photo.urls.small}
                  alt={photo.description}
                  onClick={() => this.props.handleModal(index)}
                />
              </GalleryItem>
            ))}
          </Gallery>
          {index > -1 && (
            <Modal
              photos={userPhotoCollection}
              index={index}
              hideModal={() => this.props.handleModal(-1)}
            />
          )}
        </InfiniteScroll>
      </Container>
    );
  }
}
const mapStateToProps = (state) => ({
  collections: state.collections,
});
const mapDispatchToProps = {
  fetchCollection,
  fetechSingleCollection,
  handleModal,
  clearCollection,
};
export default connect(mapStateToProps, mapDispatchToProps)(Collection);
