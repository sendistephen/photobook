import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyB1WAHlIAAXUcFSc1jUsFqhT492uBcBnuI',
  authDomain: 'photobook-38bde.firebaseapp.com',
  projectId: 'photobook-38bde',
  storageBucket: 'photobook-38bde.appspot.com',
  messagingSenderId: '1093526112301',
  appId: '1:1093526112301:web:0b18cd3e8312cb364050a4',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
