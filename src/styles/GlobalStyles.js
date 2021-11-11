import { createGlobalStyle } from 'styled-components';

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
/* Masonry Grid */
.masonry-grid_column {
  padding-left: 15px; 
  padding-right: 15px;
  background-clip: padding-box;

@media (max-width: 568px) {
    max-width: 100%;
    padding-left: 15px;
    padding-right: 15px;
    margin: auto;
  }
}

.masonry-grid_column > div {
  margin: 15px auto;
}

`;
