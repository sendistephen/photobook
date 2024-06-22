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
    background: ${(props) => props.theme.main};
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
