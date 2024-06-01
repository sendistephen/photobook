import { useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';

import { PhotoTopic, SearchCollections, SearchPhotos } from '@/components';
import { handleTabClick } from '@/store/searchSlice';

import { NavWrapper, StyledLink } from './Search.styles';

const Search = () => {
  const dispatch = useDispatch(),
    location = useLocation(),
    { searchWord } = useParams(),
    toggleTabs = () => {
      if (location.pathname.includes('photos')) {
        return <SearchPhotos />;
      }
      return <SearchCollections />;
    };

  return (
    <>
      <PhotoTopic />
      <NavWrapper>
        <StyledLink
          to={`/search/photos/${searchWord}`}
          className={({ isActive }) => (isActive ? 'main-nav-active' : '')}
          onClick={() => dispatch(handleTabClick('photos'))}
        >
          Photos
        </StyledLink>
        <StyledLink
          to={`/search/collections/${searchWord}`}
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
