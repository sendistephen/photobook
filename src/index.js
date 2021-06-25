import React from 'react';
import ReactDOM from 'react-dom';
import { Container } from 'styles';
import { GlobalStyles } from 'styles/GlobalStyles';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <Container>
      <App />
    </Container>
  </React.StrictMode>,
  document.getElementById('root')
);

if (module.hot && process.env.NODE_ENV !== 'production') {
  module.hot.accept();
}
