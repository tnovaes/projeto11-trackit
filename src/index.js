import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { UserDataProvider } from './assets/contexts/userDataContext';
import ResetStyle from './style/ResetStyle.js';
import GlobalStyle from './style/GlobalStyle.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ResetStyle />
    <GlobalStyle />
    <UserDataProvider>
      <App />
    </UserDataProvider>
  </React.StrictMode>
);
