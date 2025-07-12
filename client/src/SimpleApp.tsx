import React from 'react';

const SimpleApp = () => {
  return (
    <div style={{ 
      padding: '40px', 
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh'
    }}>
      <h1 style={{ color: '#2563eb', marginBottom: '20px' }}>
        🎉 Sistema Funcionando!
      </h1>
      
      <div style={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        marginBottom: '20px'
      }}>
        <h2>✅ Diagnóstico do Sistema</h2>
        <ul style={{ marginTop: '10px', lineHeight: '1.6' }}>
          <li>✅ React está carregando</li>
          <li>✅ TypeScript está compilando</li>
          <li>✅ Vite está servindo arquivos</li>
          <li>✅ CSS está aplicado</li>
        </ul>
      </div>
      
      <div style={{ 
        backgroundColor: '#dcfce7', 
        padding: '15px', 
        borderRadius: '8px',
        border: '1px solid #16a34a'
      }}>
        <strong style={{ color: '#15803d' }}>
          🎯 Tela branca resolvida! O sistema está funcionando normalmente.
        </strong>
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <button 
          onClick={() => window.location.href = '/quiz-descubra-seu-estilo'}
          style={{
            backgroundColor: '#2563eb',
            color: 'white',
            padding: '12px 24px',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px',
            marginRight: '10px'
          }}
        >
          Ir para Quiz
        </button>
        
        <button 
          onClick={() => window.location.reload()}
          style={{
            backgroundColor: '#6b7280',
            color: 'white',
            padding: '12px 24px',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Recarregar
        </button>
      </div>
    </div>
  );
};

export default SimpleApp;
