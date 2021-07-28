import Loader from 'react-loader-spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Modal } from 'components';
import React, { Component } from 'react';
import { breakpointColumns } from 'utils/helper';
import {
  fetchCollection,
  handleModal,
} from 'store/collections/collectionsActions';
import { fetechSingleCollection } from 'store/collection/collectionActions';
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

  render() {
    const { index, isLoading, photoCollection, hasMore } =
      this.props.photoCollection;
    const { collection } = this.props.collection;
    console.log(collection);
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
          dataLength={photoCollection.length}
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
            {photoCollection.map((photo, index) => (
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
              photos={photoCollection}
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
  photoCollection: state.photoCollection,
  collection: state.collection,
});
const mapDispatchToProps = {
  fetchCollection,
  fetechSingleCollection,
  handleModal,
};
export default connect(mapStateToProps, mapDispatchToProps)(Collection);
