import { PhotoTopic, SearchCollections, SearchPhotos } from 'components';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyledLink, NavWrapper } from './Search.styles';
import { handleTabClick } from '../../store/search/searchActions';

class Search extends Component {
  toggleTabs = () => {
    if (this.props.location.pathname.includes('photos')) {
      return <SearchPhotos />;
    } else {
      return <SearchCollections />;
    }
  };

  render() {
    return (
      <>
        <PhotoTopic />
        <NavWrapper>
          <StyledLink
            to={`/search/photos/${this.props.match.params.searchWord}`}
            activeClassName='main-nav-active'
            onClick={() => this.props.handleTabClick('photos')}
          >
            Photos
          </StyledLink>
          <StyledLink
            to={`/search/collections/${this.props.match.params.searchWord}`}
            activeClassName='main-nav-active'
            onClick={() => this.props.handleTabClick('collections')}
          >
            Collections
          </StyledLink>
        </NavWrapper>
        {this.toggleTabs()}
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  search: state.search,
});
const mapDispatchToProps = {
  handleTabClick,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
