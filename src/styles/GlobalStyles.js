import { createGlobalStyle } from 'styled-components';
import { theme } from './ColorStyles';
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
    background: ${theme.light.main};
    height:100%;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
/* Masonry Grid */
.masonry-grid_column {
  padding-left: 15px; 
  background-clip: padding-box;

@media (max-width: 568px) {
    max-width: 100%;
    padding-left: 0px;
  }
}

.masonry-grid_column > div {
  margin: 15px auto;
}

  &.main-nav-active {
    &:first-child{
      background: #A2C8FA 0% 0% no-repeat padding-box;
    }
    &:nth-child(2){
    background: #ffb4bc 0% 0% no-repeat padding-box;
    }
  }
`;
