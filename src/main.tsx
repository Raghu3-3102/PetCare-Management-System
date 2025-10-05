import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Toaster } from 'react-hot-toast'; // ✅ import Toaster

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <Toaster position="top-right" reverseOrder={false} /> {/* ✅ Add Toaster */}
  </React.StrictMode>,
);
