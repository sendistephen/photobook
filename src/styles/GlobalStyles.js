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
html{
     min-height:100%;
    box-sizing: border-box;
}
body{
    background: ${theme.light.main};
    height:100%;
}
/* Masonry Grid */
.masonry-grid {
  display: -webkit-box; 
  display: -ms-flexbox;
  display: flex;
  max-width: 60%;
  margin: 50px auto;
}
.masonry-grid_column {
  padding-left: 15px; /* gutter size */
  background-clip: padding-box;
}

/* Style your items */
.masonry-grid_column > div {
  margin: 15px auto;
}
.spinner{
  text-align:center;
}
`;
