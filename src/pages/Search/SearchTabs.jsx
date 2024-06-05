import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useTheme } from 'styled-components';

import { handleTabClick } from '@/store/searchSlice';

import { NavWrapper, StyledLink } from './Search.styles';

const SearchTabLink = ({ to, searchWord, tabName, handleTabClick }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  return (
    <StyledLink
      to={`${to}/${searchWord}`}
      style={({ isActive }) => ({
        color: isActive ? theme.linkColor : '',
      })}
      onClick={() => dispatch(handleTabClick(tabName))}
    >
      {tabName}
    </StyledLink>
  );
};

export const SearchTabs = () => {
  const { searchWord } = useParams();

  return (
    <NavWrapper>
      <SearchTabLink
        to="/search/photos"
        searchWord={searchWord}
        tabName="Photos"
        handleTabClick={handleTabClick}
      />
      <SearchTabLink
        to="/search/collections"
        searchWord={searchWord}
        tabName="Collections"
        handleTabClick={handleTabClick}
      />
    </NavWrapper>
  );
};
