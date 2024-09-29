import { FlexContainer, StyledNavLink } from '@/styles/GlobalStyles';
import styled from 'styled-components';

export const SearchTabs = styled(FlexContainer).attrs({
  gap: 'xl',
  justify: 'start',
})`
  margin-top: 80px;
  margin-bottom: 20px;
  gap: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.md} 0;
  position: sticky;
  top: 73.7px;
  background-color: ${({ theme }) => theme.colors.background};
  z-index: 1000;
`;

export const SearchTabLink = StyledNavLink;
