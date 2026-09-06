/**
 * Main: Application entry point mounting the root App and global design tokens.
 * Communicates with: App.tsx, index.html, tokens.css, typography.css, and globals.css.
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/styles/tokens.css';
import '@/styles/typography.css';
import '@/styles/globals.css';
import { App } from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
