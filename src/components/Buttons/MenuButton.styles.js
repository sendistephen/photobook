import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const Icon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
  opacity: 1;
`;
export const MenuItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  span {
    margin-top: 2px;
    font-size: 13px;
    color: #999999;
  }
  @media (max-width: 768px) {
    flex-direction: row;
    span {
      margin-left: 12px;
    }
  }
`;

export const StyledLink = styled(NavLink)`
  background: ${(props) => props.theme.activeLink};
  border-radius: 5px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: fit-content;
  height: fit-content;

  &.main-nav-active {
    color: ${(props) => props.theme.text};
    font-weight: 500;
    background: ${(props) => (props.isActive ? '#a2c8fa' : '#ffb4bc')};
  }
`;
