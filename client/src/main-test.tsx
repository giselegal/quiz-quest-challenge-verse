import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// Componente de teste simples
const SimpleTest = () => {
  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'Arial', 
      backgroundColor: '#f0f0f0',
      minHeight: '100vh'
    }}>
      <h1 style={{ color: '#333' }}>🚀 Quiz Quest - Teste Básico</h1>
      <p>✅ React está funcionando!</p>
      <p>✅ HTML está carregando!</p>
      <p>📍 URL: {window.location.href}</p>
      <p>🌐 Online: {navigator.onLine ? 'Sim' : 'Não'}</p>
      <p>⏰ Carregado em: {new Date().toLocaleTimeString()}</p>
      
      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#e8f5e8', border: '1px solid #4caf50' }}>
        <strong>✅ Sistema funcionando corretamente!</strong>
      </div>
      
      <button 
        onClick={() => window.location.href = '/quiz-descubra-seu-estilo'}
        style={{ 
          marginTop: '20px', 
          padding: '10px 20px', 
          backgroundColor: '#007bff', 
          color: 'white', 
          border: 'none', 
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Ir para Quiz
      </button>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SimpleTest />
  </React.StrictMode>,
);
