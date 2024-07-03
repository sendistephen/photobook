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
  background: ${(props) => props.theme.colors.surface};
  border-radius: 5px;
  font-size: ${({ theme }) => theme.fonts.sm};
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: fit-content;
  height: fit-content;
  text-decoration: none;
  color: ${(props) => props.theme.colors.linkColor};

  &.main-nav-active {
    background: ${(props) => props.theme.colors.activeLinkBackground};
    color: ${(props) => props.theme.colors.activeLinkColor};
  }

  &:hover {
    background: ${(props) => props.theme.colors.hoverLinkBackground};
    color: ${(props) => props.theme.colors.hoverLinkColor};
  }

  &:focus {
    outline: 2px solid ${(props) => props.theme.colors.secondary};
    background: ${(props) => props.theme.colors.focusLinkBackground};
    color: ${(props) => props.theme.colors.focusLinkColor};
  }
`;
