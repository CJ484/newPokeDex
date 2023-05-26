import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './Translation';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  // eslint-disable-next-line react/jsx-filename-extension
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
