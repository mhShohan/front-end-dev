import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ChartApp } from './components/chart-app.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <>
      <ChartApp />
      <App />
    </>
  </StrictMode>
);
