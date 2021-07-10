import { PhotoTopic, SearchCollections, SearchPhotos } from 'components';
import React, { Component } from 'react';
import { StyledLink, NavWrapper } from './Search.styles';

export default class Search extends Component {
  state = {
    activeTab: '',
  };

  toggleTabs = () => {
    switch (this.state.activeTab) {
      case 'collections':
        return <SearchCollections />;
      default:
        return <SearchPhotos />;
    }
  };
  handleClick = (selectedChoice) => {
    this.setState({ activeTab: selectedChoice });
  };
  render() {
    return (
      <>
        <PhotoTopic />
        <NavWrapper>
          <StyledLink
            to={`/search/photos/${this.props.match.params.searchWord}`}
            activeClassName='main-nav-active'
            onClick={() => this.handleClick('photos')}
          >
            Photos
          </StyledLink>
          <StyledLink
            to={`/search/collections/${this.props.match.params.searchWord}`}
            activeClassName='main-nav-active'
            onClick={() => this.handleClick('collections')}
          >
            Collections
          </StyledLink>
        </NavWrapper>
        {this.toggleTabs()}
      </>
    );
  }
}
