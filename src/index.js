import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { TokenProvider } from './assets/contexts/tokenContext';
import ResetStyle from './style/ResetStyle';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ResetStyle />
    <TokenProvider>
      <App />
    </TokenProvider>
  </React.StrictMode>
);
