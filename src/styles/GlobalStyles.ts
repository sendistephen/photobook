import { SkeletonWrapper } from '@/components/Gallery/Gallery.styles';
import styled, { createGlobalStyle } from 'styled-components';
import { Container } from '.';

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