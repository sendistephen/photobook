import axios from 'axios';
import Loader from 'react-loader-spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Modal } from 'components';
import React, { Component } from 'react';
import { getCollection, getSingleCollection } from 'utils/api';
import { breakpointColumns } from 'utils/helper';

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

export default class Collection extends Component {
  state = {
    photoCollection: [],
    collection: {},
    hasMore: true,
    isLoading: false,
    index: -1,
    page: 1,
    perPage: 30,
    error: null,
  };

  componentDidMount = () => {
    this.fetchCollection();
    this.fetechSingleCollection();
  };
  handleModal = (index) => this.setState({ index });

  fetchCollection = async () => {
    const { page, perPage } = this.state;
    try {
      this.setState({ isLoading: true });
      const url = getCollection({
        collectionId: this.props.match.params.collectionId,
        page,
        perPage,
      });
      const res = await axios(url);
      const data = res.data;
      this.setState({
        photoCollection: [...this.state.photoCollection, ...data],
        page: page + 1,
        hasMore: !!data.length,
        isLoading: false,
        error: null,
      });
    } catch (err) {
      this.setState({ error: err.message });
    }
  };
  fetechSingleCollection = async () => {
    try {
      const url = getSingleCollection({
        collectionId: this.props.match.params.collectionId,
      });
      const res = await axios(url);
      const data = res.data;
      this.setState({ collection: data });
    } catch (err) {
      this.setState({ error: err.message });
    }
  };
  render() {
    const { index, isLoading, collection, photoCollection, hasMore } =
      this.state;
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
          next={this.fetchCollection}
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
                  onClick={() => this.handleModal(index)}
                />
              </GalleryItem>
            ))}
          </Gallery>
          {index > -1 && (
            <Modal
              photos={photoCollection}
              index={index}
              hideModal={() => this.handleModal(-1)}
            />
          )}
        </InfiniteScroll>
      </Container>
    );
  }
}
