import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/firebase/firebase-config';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from '@/store';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
