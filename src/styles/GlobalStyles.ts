import { SkeletonWrapper } from '@/components/Gallery/Gallery.styles';
import styled, { createGlobalStyle } from 'styled-components';
import { Container } from '.';
import { NavLink } from 'react-router-dom';
import { FlexContainerProps } from 'types/theme';

export const GlobalStyles = createGlobalStyle`

*,
*::before,
*::after{
    padding:0;
    margin: 0;
    box-sizing: inherit;
   
}
a{
  text-decoration:none;
  font-family: inherit;
}
html{
    min-height:100%;
    box-sizing: border-box;
}
body{
    background: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.textPrimary};
    height:100%;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    transition: all 0.50s linear;
}

.my-masory-grid {
  display: flex;
  width: 100%;
  margin-left: -16px; /* gutter size offset */
}
.my-masory-grid_column {
  padding-left: 30px; /* gutter size */
  background-clip: padding-box;
}
.my-masory-grid_column > div {
  margin-bottom: 30px;
}
`;

export const FlexContainer = styled.div<FlexContainerProps>`
  display: flex;
  justify-content: ${({ justify = 'center' }) => justify};
  align-items: ${({ align = 'center' }) => align};
  flex-direction: ${({flexDirection ='row'}) => flexDirection};
  gap: ${({ theme, gap }) => (gap === '0' ? '0' : theme.spacing[gap || 'md'])};
`;

export const SuspenseSkeletonContainer = styled(Container)`
  margin-top: 200px;
`;
export const SuspenseSkeletonWrapper = styled(SkeletonWrapper)`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;
export const SuspenseSkeleton = styled(SkeletonWrapper)`
  max-width: 200px;
  width: 100%;
`;

export const Button = styled.button`
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({ theme }) => theme.fonts.sm};
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.onSecondary};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition:
    background-color 0.3s,
    box-shadow 0.3s,
    opacity 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondaryVariant};
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
    opacity: 0.9;
  }
  &:active {
    background-color: ${({ theme }) => theme.colors.secondaryVariant};
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
    opacity: 1;
  }
`;

export const StyledNavLink = styled(NavLink)`
  font-size: ${({ theme }) => theme.fonts.sm};
  text-decoration: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: color 0.3s, border-bottom 0.3s;

  &:hover {
    color: ${({ theme }) => theme.colors.hoverLinkColor};
  }
  &.active {
    color: ${({ theme }) => theme.colors.linkColor};
    border-bottom: 2px solid ${({ theme }) => theme.colors.linkColor};
  }
`;

export const Tag = styled.div`
  padding: 4px 8px;
  background-color: ${({ theme }) => theme.colors.cardSurface};
  border-radius: 4px;
  font-size: ${({ theme }) => theme.fonts.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: capitalize;
`;

export const TagItem = styled.div`
  background-color: ${({ theme }) => theme.colors.cardSurface};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fonts.xs};
  border-radius: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.xs};
  text-transform: capitalize;
`;

export const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`;