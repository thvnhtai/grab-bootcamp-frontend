import { App as AppAnt } from 'antd';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppAnt>
      <App />
    </AppAnt>
  </StrictMode>
);
