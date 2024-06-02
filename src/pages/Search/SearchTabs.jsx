import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useTheme } from 'styled-components';

import { handleTabClick } from '@/store/searchSlice';

import { NavWrapper, StyledLink } from './Search.styles';

export const SearchTabs = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  //   const location = useLocation();
  const { searchWord } = useParams();

  return (
    <NavWrapper>
      <StyledLink
        to={`/search/photos/${searchWord}`}
        style={({ isActive }) => ({
          color: isActive ? theme.linkColor : '',
        })}
        onClick={() => dispatch(handleTabClick('photos'))}
      >
        Photos
      </StyledLink>
      <StyledLink
        to={`/search/collections/${searchWord}`}
        style={({ isActive }) => ({
          color: isActive ? theme.linkColor : '',
        })}
        onClick={() => dispatch(handleTabClick('collections'))}
      >
        Collections
      </StyledLink>
    </NavWrapper>
  );
};
