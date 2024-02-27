import { PhotoTopic, SearchCollections, SearchPhotos } from 'components';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { handleTabClick } from 'store/searchSlice';
import { NavWrapper, StyledLink } from './Search.styles';

const Search = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const toggleTabs = () => {
    if (location.pathname.includes('photos')) {
      return <SearchPhotos />;
    } else {
      return <SearchCollections />;
    }
  };

  return (
    <>
      <PhotoTopic />
      <NavWrapper>
        <StyledLink
          to={`/search/photos/${this.props.match.params.searchWord}`}
          className={({ isActive }) => (isActive ? 'main-nav-active' : '')}
          onClick={() => dispatch(handleTabClick('photos'))}
        >
          Photos
        </StyledLink>
        <StyledLink
          to={`/search/collections/${this.props.match.params.searchWord}`}
          className={({ isActive }) => (isActive ? 'main-nav-active' : '')}
          onClick={() => dispatch(handleTabClick('collections'))}
        >
          Collections
        </StyledLink>
      </NavWrapper>
      {toggleTabs()}
    </>
  );
};

export default Search;
