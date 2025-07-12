
import React from 'react';
import ReactDOM from 'react-dom/client';
import SimpleApp from './SimpleApp.tsx';
import './index.css';

console.log('🚀 Main.tsx carregando...');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SimpleApp />
  </React.StrictMode>,
);

console.log('✅ Main.tsx carregado com sucesso!');
