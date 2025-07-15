/**
 * RichTextBlock - Componente de texto rico usando Quill.js
 * 
 * Fornece edição de texto avançada com formatação, listas, links, etc.
 */

import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import 'quill/dist/quill.snow.css';

// Importação lazy do ReactQuill
const ReactQuill = lazy(() => import('react-quill'));

export interface RichTextBlockProps {
  blockId: string;
  content: string;
  onChange: (content: string) => void;
  isEditing?: boolean;
  isSelected?: boolean;
  onEdit?: () => void;
  onSelect?: () => void;
  className?: string;
  minHeight?: number;
  placeholder?: string;
}

// Configuração do toolbar do Quill
const quillModules = {
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'align': [] }],
    ['link', 'image'],
    ['clean']
  ],
};

const quillFormats = [
  'header', 'bold', 'italic', 'underline', 'strike',
  'color', 'background', 'list', 'bullet', 'align',
  'link', 'image'
];

export const RichTextBlock: React.FC<RichTextBlockProps> = ({
  blockId,
  content,
  onChange,
  isEditing = false,
  isSelected = false,
  onEdit,
  onSelect,
  className = '',
  minHeight = 100,
  placeholder = 'Clique para editar...'
}) => {
  const [isEditingInternal, setIsEditingInternal] = useState(false);
  const [currentContent, setCurrentContent] = useState(content);
  const quillRef = useRef<any>(null);

  useEffect(() => {
    setCurrentContent(content);
  }, [content]);

  const handleDoubleClick = () => {
    setIsEditingInternal(true);
    onEdit?.();
  };

  const handleClick = () => {
    onSelect?.();
  };

  const handleBlur = () => {
    setIsEditingInternal(false);
    if (currentContent !== content) {
      onChange(currentContent);
    }
  };

  const handleChange = (value: string) => {
    setCurrentContent(value);
  };

  const stripHtml = (html: string) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const isEmpty = !currentContent || stripHtml(currentContent).trim().length === 0;

  return (
    <div
      className={`relative group transition-all duration-200 ${
        isSelected ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
      } ${className}`}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      {isEditingInternal || isEditing ? (
        <div className="rich-text-editor">
          <Suspense fallback={<div className="animate-pulse bg-gray-200 h-32 rounded-md"></div>}>
            <ReactQuill
              ref={quillRef}
              theme="snow"
              value={currentContent}
              onChange={handleChange}
              onBlur={handleBlur}
              modules={quillModules}
              formats={quillFormats}
              placeholder={placeholder}
              style={{ minHeight: `${minHeight}px` }}
            />
          </Suspense>
        </div>
      ) : (
        <div
          className={`rich-text-display cursor-pointer hover:bg-gray-50 transition-colors duration-200 p-4 rounded-md border-2 border-transparent hover:border-gray-200 ${
            isEmpty ? 'text-gray-400 italic' : ''
          }`}
          style={{ minHeight: `${minHeight}px` }}
          dangerouslySetInnerHTML={{ 
            __html: isEmpty ? placeholder : currentContent 
          }}
        />
      )}
      
      {/* Toolbar de ações quando selecionado */}
      {isSelected && !isEditingInternal && (
        <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          <button
            className="p-1 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50"
            onClick={(e) => {
              e.stopPropagation();
              handleDoubleClick();
            }}
            title="Editar texto"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
        </div>
      )}

      {/* CSS customizado para o Quill */}
      <style>{`
        .rich-text-editor .ql-toolbar {
          border-top: 1px solid #ccc;
          border-left: 1px solid #ccc;
          border-right: 1px solid #ccc;
          border-bottom: none;
          border-radius: 0.375rem 0.375rem 0 0;
        }

        .rich-text-editor .ql-container {
          border-bottom: 1px solid #ccc;
          border-left: 1px solid #ccc;
          border-right: 1px solid #ccc;
          border-top: none;
          border-radius: 0 0 0.375rem 0.375rem;
          font-family: inherit;
        }

        .rich-text-editor .ql-editor {
          min-height: ${minHeight}px;
          font-size: 14px;
          line-height: 1.5;
        }

        .rich-text-editor .ql-editor.ql-blank::before {
          color: #9ca3af;
          font-style: italic;
        }

        .rich-text-display h1 {
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 1rem;
        }

        .rich-text-display h2 {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 0.75rem;
        }

        .rich-text-display h3 {
          font-size: 1.25rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
        }

        .rich-text-display p {
          margin-bottom: 1rem;
        }

        .rich-text-display ul, .rich-text-display ol {
          margin-left: 1.5rem;
          margin-bottom: 1rem;
        }

        .rich-text-display li {
          margin-bottom: 0.25rem;
        }

        .rich-text-display a {
          color: #3b82f6;
          text-decoration: underline;
        }

        .rich-text-display a:hover {
          color: #1d4ed8;
        }

        .rich-text-display strong {
          font-weight: bold;
        }

        .rich-text-display em {
          font-style: italic;
        }

        .rich-text-display img {
          max-width: 100%;
          height: auto;
          border-radius: 0.375rem;
        }
      `}</style>
    </div>
  );
};

export default RichTextBlock;
