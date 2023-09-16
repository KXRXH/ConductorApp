import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { UUIDProvider } from './utils/State';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <UUIDProvider>
      <App />
    </UUIDProvider>
  </React.StrictMode>
);