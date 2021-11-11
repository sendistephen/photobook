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
    &:first-child {
      background: #a2c8fa 0% 0% no-repeat padding-box;
    }
    &:nth-child(2) {
      background: #ffb4bc 0% 0% no-repeat padding-box;
    }
  }
`;
