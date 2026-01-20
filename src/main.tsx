import React from 'react';
import { createRoot } from 'react-dom/client';
import Layout from './layout.tsx';
import "./utils/I18nextInit.jsx"

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Layout />
  </React.StrictMode>
)