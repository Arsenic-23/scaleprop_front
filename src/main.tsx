import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css'; // Your Tailwind + global styles

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('❌ Root element not found');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);