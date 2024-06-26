import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { StyledMasonry } from '../../styles';

export const Gallery = styled(StyledMasonry)``;

export const StyledLink = styled(NavLink)`
  font-size: 18px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: gray;
  font-size: 15px;

  &.main-nav-active {
    color: ${(props) => props.theme.text};
    font-weight: 500;
    background: ${(props) => (props.isActive ? '#a2c8fa' : '#ffb4bc')};
  }
`;

export const NavWrapper = styled.div`
  max-width: 82%;
  padding-top: 120px;
  display: grid;
  grid-template-columns: 50px 50px;
  justify-content: flex-end;
  gap: 40px;
`;
