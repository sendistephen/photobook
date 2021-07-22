import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const Icon = styled.img`
  width: 30px;
  height: 30px;
  cursor: pointer;
  opacity: 1;
`;
export const MenuItem = styled.div`
  width: 40px;
  height: 50px;

  display: grid;
  justify-content: center;
  align-items: center;
`;

export const StyledLink = styled(NavLink)`
  width: 49px;
  height: 49px;
  background: ${props => props.theme.activeLink};
  border-radius: 8px;
  color: #999999;
  font-size: 13px;

  display: grid;
  justify-items: center;

  &.main-nav-active {
    &:first-child {
      background: #a2c8fa 0% 0% no-repeat padding-box;
    }
    &:nth-child(2) {
      background: #ffb4bc 0% 0% no-repeat padding-box;
    }
  }
`;
