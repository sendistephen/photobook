import { Container } from '@/styles';
import { Outlet, useLocation } from 'react-router-dom';
import { SearchTabLink, SearchTabs } from './Search.styles';

const Search = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query');

  return (
    <Container>
      <SearchTabs>
        <SearchTabLink to={`/search/photos?query=${query}`} end>
          Photos
        </SearchTabLink>
        <SearchTabLink to={`/search/collections?query=${query}`} end>
          Collections
        </SearchTabLink>
      </SearchTabs>
      <Outlet />
    </Container>
  );
};

export default Search;
