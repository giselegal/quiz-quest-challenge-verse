import React, { useState } from 'react';
import { EditorBlock } from './types/EditorTypes';

interface SimpleEditorProps {
  initialBlocks?: EditorBlock[];
  onSave?: (blocks: EditorBlock[]) => void;
}

/**
 * Editor Simples ES7 - Para teste inicial
 * Versão simplificada do editor para validação da arquitetura
 */
const SimpleEditor: React.FC<SimpleEditorProps> = ({
  initialBlocks = [],
  onSave
}) => {
  const [blocks, setBlocks] = useState<EditorBlock[]>(initialBlocks);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);

  const addBlock = (type: string) => {
    const newBlock: EditorBlock = {
      id: `block-${Date.now()}`,
      type: type as any,
      content: {
        title: `Novo ${type}`,
        text: 'Texto de exemplo'
      },
      order: blocks.length,
      metadata: {
        createdAt: new Date(),
        updatedAt: new Date(),
        version: '1.0.0'
      }
    };

    setBlocks(prev => [...prev, newBlock]);
  };

  const updateBlock = (blockId: string, content: any) => {
    setBlocks(prev => 
      prev.map(block => 
        block.id === blockId 
          ? { ...block, content: { ...block.content, ...content } }
          : block
      )
    );
  };

  const deleteBlock = (blockId: string) => {
    setBlocks(prev => prev.filter(block => block.id !== blockId));
    if (selectedBlockId === blockId) {
      setSelectedBlockId(null);
    }
  };

  const handleSave = () => {
    onSave?.(blocks);
    console.log('✅ [SimpleEditor] Blocks saved:', blocks);
  };

  const selectedBlock = blocks.find(block => block.id === selectedBlockId);

  return (
    <div style={{
      display: 'flex',
      height: '600px',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      overflow: 'hidden'
    }}>
      {/* Sidebar */}
      <div style={{
        width: '250px',
        backgroundColor: '#f9fafb',
        borderRight: '1px solid #e5e7eb',
        padding: '16px'
      }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 'bold' }}>
          Componentes
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button
            onClick={() => addBlock('quiz-header')}
            style={{
              padding: '8px 12px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            🎯 Quiz Header
          </button>
          
          <button
            onClick={() => addBlock('quiz-question')}
            style={{
              padding: '8px 12px',
              backgroundColor: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            ❓ Quiz Question
          </button>
          
          <button
            onClick={() => addBlock('heading')}
            style={{
              padding: '8px 12px',
              backgroundColor: '#8b5cf6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            📝 Heading
          </button>
          
          <button
            onClick={() => addBlock('paragraph')}
            style={{
              padding: '8px 12px',
              backgroundColor: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            📄 Paragraph
          </button>
        </div>
        
        <hr style={{ margin: '16px 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />
        
        <button
          onClick={handleSave}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#059669',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold'
          }}
        >
          💾 Salvar
        </button>
      </div>

      {/* Canvas */}
      <div style={{
        flex: 1,
        padding: '16px',
        overflow: 'auto'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px'
        }}>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>
            Canvas ({blocks.length} blocos)
          </h3>
          
          {blocks.length > 0 && (
            <button
              onClick={() => setBlocks([])}
              style={{
                padding: '4px 8px',
                backgroundColor: '#dc2626',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              🗑️ Limpar
            </button>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {blocks.map((block) => (
            <div
              key={block.id}
              onClick={() => setSelectedBlockId(block.id)}
              style={{
                padding: '12px',
                border: selectedBlockId === block.id ? '2px solid #3b82f6' : '1px solid #e5e7eb',
                borderRadius: '4px',
                cursor: 'pointer',
                backgroundColor: selectedBlockId === block.id ? '#eff6ff' : 'white'
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '8px'
              }}>
                <span style={{ fontWeight: 'bold', fontSize: '14px' }}>
                  {block.type.toUpperCase()}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteBlock(block.id);
                  }}
                  style={{
                    padding: '2px 6px',
                    backgroundColor: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '2px',
                    cursor: 'pointer',
                    fontSize: '10px'
                  }}
                >
                  ✕
                </button>
              </div>
              
              <div style={{ fontSize: '12px', color: '#6b7280' }}>
                <div><strong>Título:</strong> {block.content.title || 'Sem título'}</div>
                <div><strong>Texto:</strong> {block.content.text || 'Sem texto'}</div>
              </div>
            </div>
          ))}
          
          {blocks.length === 0 && (
            <div style={{
              padding: '40px',
              textAlign: 'center',
              color: '#6b7280',
              border: '2px dashed #e5e7eb',
              borderRadius: '8px'
            }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>📝</div>
              <p>Adicione componentes usando a sidebar à esquerda</p>
            </div>
          )}
        </div>
      </div>

      {/* Properties Panel */}
      {selectedBlock && (
        <div style={{
          width: '250px',
          backgroundColor: '#f9fafb',
          borderLeft: '1px solid #e5e7eb',
          padding: '16px'
        }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 'bold' }}>
            Propriedades
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>
                Título:
              </label>
              <input
                type="text"
                value={selectedBlock.content.title || ''}
                onChange={(e) => updateBlock(selectedBlock.id, { title: e.target.value })}
                style={{
                  width: '100%',
                  padding: '6px 8px',
                  border: '1px solid #d1d5db',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>
                Texto:
              </label>
              <textarea
                value={selectedBlock.content.text || ''}
                onChange={(e) => updateBlock(selectedBlock.id, { text: e.target.value })}
                style={{
                  width: '100%',
                  padding: '6px 8px',
                  border: '1px solid #d1d5db',
                  borderRadius: '4px',
                  fontSize: '14px',
                  minHeight: '80px',
                  resize: 'vertical'
                }}
              />
            </div>

            {selectedBlock.type === 'quiz-header' && (
              <>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>
                    Progress (%):
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={selectedBlock.content.progressPercent || 0}
                    onChange={(e) => updateBlock(selectedBlock.id, { progressPercent: parseInt(e.target.value) })}
                    style={{
                      width: '100%',
                      padding: '6px 8px',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px',
                      fontSize: '14px'
                    }}
                  />
                </div>
                
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>
                    Logo URL:
                  </label>
                  <input
                    type="text"
                    value={selectedBlock.content.logoUrl || ''}
                    onChange={(e) => updateBlock(selectedBlock.id, { logoUrl: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '6px 8px',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px',
                      fontSize: '14px'
                    }}
                  />
                </div>
              </>
            )}
            
            <div style={{
              padding: '8px',
              backgroundColor: '#fef3c7',
              borderRadius: '4px',
              fontSize: '12px',
              color: '#92400e'
            }}>
              <strong>Tipo:</strong> {selectedBlock.type}<br />
              <strong>ID:</strong> {selectedBlock.id}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimpleEditor;
