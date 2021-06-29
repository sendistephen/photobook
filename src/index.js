import React from 'react';
import ReactDOM from 'react-dom';
import { GlobalStyles } from 'styles/GlobalStyles';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

if (module.hot && process.env.NODE_ENV !== 'production') {
  module.hot.accept();
}
