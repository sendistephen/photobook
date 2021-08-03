import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from 'react-loader-spinner';
import {
  Gallery,
  CollectionItem,
  CollectionImage,
  TotalPhotos,
} from './SearchCollections.styles';
import { breakpointColumns } from 'utils/helper';
import { Container, LoadingSpinner, Message } from 'styles';
import {
  fetchCollections,
  clearCollection,
} from '../../store/search/searchActions';

class SearchCollections extends Component {
  componentDidMount = () => {
    const { searchWord } = this.props.match.params;
    this.props.fetchCollections(searchWord);
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { searchWord } = this.props.match.params;
    if (
      prevProps.match.params.searchWord !== this.props.match.params.searchWord
    ) {
      this.props.fetchCollections(searchWord);
    }
  };
  componentWillUnmount() {
    this.props.clearCollection();
  }
  render() {
    const { collections, hasMore } = this.props.collections;
    return (
      <Container>
        <InfiniteScroll
          dataLength={collections.length}
          next={this.props.fetchCollections}
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
              <Link
                key={collection.id}
                to={`/collections/${collection.id}/photos`}
              >
                <CollectionItem>
                  <CollectionImage
                    src={collection.cover_photo.urls.small}
                    alt={collection.description}
                  />
                  <TotalPhotos>{collection.total_photos} photos</TotalPhotos>
                </CollectionItem>
              </Link>
            ))}
          </Gallery>
        </InfiniteScroll>
      </Container>
    );
  }
}
const mapStateToProps = (state) => ({
  collections: state.search,
});
const mapDispatchToProps = {
  fetchCollections,
  clearCollection,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SearchCollections));
