import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const SearchTabs = styled.div`
  margin-top: 80px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.md} 0;
  position: sticky;
  top: 73.7px;
  background-color: ${({ theme }) => theme.colors.background};
  z-index: 1000;
`;

export const SearchTabLink = styled(NavLink)`
  font-size: ${({ theme }) => theme.fonts.sm};
  text-decoration: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  transition:
    color 0.3s,
    border-bottom 0.3s;

  &:hover {
    color: ${({ theme }) => theme.colors.hoverLinkColor};
  }
  &.active {
    color: ${({ theme }) => theme.colors.linkColor};
    border-bottom: 2px solid ${({ theme }) => theme.colors.linkColor};
  }
`;
