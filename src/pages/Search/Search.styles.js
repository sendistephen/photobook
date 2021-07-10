import styled from 'styled-components';
import { StyledMasonry } from 'pages/Photos/PhotoList.styles';
import { NavLink } from 'react-router-dom';

export const Gallery = styled(StyledMasonry)``;

export const StyledLink = styled(NavLink)`
  font-size: 18px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: gray;
  font-size: 15px;

  &.main-nav-active {
    background: transparent;
    color: black;
    font-weight: 500;
  }
`;
export const NavWrapper = styled.div`
  max-width: 80%;
  padding-top: 30px;
  display: grid;
  grid-template-columns: 50px 50px;
  justify-content: flex-end;
  gap: 40px;
`;
