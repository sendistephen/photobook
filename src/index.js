import Navbar from 'components/Navbar/Navbar';
import React from 'react';
import ReactDOM from 'react-dom';
import { Container } from 'styles';
import { GlobalStyles } from 'styles/GlobalStyles';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <Container>
      <Navbar />
      <App />
    </Container>
  </React.StrictMode>,
  document.getElementById('root')
);
