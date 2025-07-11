import React from 'react';
import ReactDOM from 'react-dom/client';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error("❌ Root element not found");

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <div style={{ padding: 20, fontSize: 20, textAlign: 'center' }}>
      ✅ App Loaded Successfully
    </div>
  </React.StrictMode>
);