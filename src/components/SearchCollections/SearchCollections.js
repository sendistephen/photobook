import axios from 'axios';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from 'react-loader-spinner';
import { getCollections } from 'utils/api';
import {
  Gallery,
  CollectionItem,
  CollectionImage,
  TotalPhotos,
} from './SearchCollections.styles';
import { breakpointColumns } from 'utils/helper';
import { LoadingSpinner, Message } from 'pages/Photos/PhotoList.styles';

class SearchCollections extends Component {
  state = {
    collections: [],
    page: 1,
    perPage: 25,
    isLoading: false,
    error: null,
    hasMore: true,
  };
  componentDidMount = () => {
    this.fetchCollections();
  };

  fetchCollections = async () => {
    const { perPage, page } = this.state;
    try {
      this.setState({ isLoading: true });
      const url = getCollections({
        query: this.props.match.params.searchWord,
        page,
        perPage,
      });
      const res = await axios(url);
      const data = res.data.results;
      this.setState({
        collections: [...this.state.collections, ...data],
        isLoading: false,
        page: page + 1,
        hasMore: data.length >= perPage,
      });
    } catch (err) {
      this.setState({ error: err.message });
    }
  };
  componentDidUpdate = (prevProps, prevState) => {
    if (
      prevProps.match.params.searchWord !== this.props.match.params.searchWord
    ) {
      this.setState({ collections: [] });

      this.fetchCollections();
    }
  };

  render() {
    const { collections, hasMore } = this.state;
    return (
      <>
        <InfiniteScroll
          dataLength={collections.length}
          next={this.fetchSearched}
          hasMore={hasMore}
          loader={
            <LoadingSpinner>
              <Loader type='ThreeDots' color='#32D3AC' />
            </LoadingSpinner>
          }
          endMessage={
            <Message>
              <b>There are no more photo collections</b>
            </Message>
          }
        >
          <Gallery
            breakpointCols={breakpointColumns}
            columnClassName='masonry-grid_column'
          >
            {collections.map((collection) => (
              <CollectionItem key={collection.id}>
                <CollectionImage
                  src={collection.cover_photo.urls.small}
                  alt={collection.description}
                />
                <TotalPhotos>{collection.total_photos} photos</TotalPhotos>
              </CollectionItem>
            ))}
          </Gallery>
        </InfiniteScroll>
      </>
    );
  }
}

export default withRouter(SearchCollections);
