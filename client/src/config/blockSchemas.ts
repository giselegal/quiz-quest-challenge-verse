// =====================================================================
// 1. types.ts - Definições de tipos (em um projeto real, seria um arquivo separado)
// =====================================================================
import React from 'react';

// Tipos para as propriedades de cada campo no painel de propriedades
export type PropertyType = 'text' | 'number' | 'color' | 'select' | 'boolean' | 'url' | 'array-of-objects' | 'image';

export interface PropertySchema {
  key: string; // Chave da propriedade (ex: 'text', 'fontSize')
  label: string; // Rótulo visível no painel
  type: PropertyType; // Tipo de controle (text, color, select, array-of-objects, etc.)
  defaultValue?: any; // Valor padrão
  options?: { label: string; value: string }[]; // Para tipo 'select'
  nestedPath?: string; // Para propriedades aninhadas (ex: 'styles.backgroundColor')
  itemSchema?: PropertySchema[]; // Para 'array-of-objects', define o schema de cada item
}

// Interface base para qualquer bloco
export interface Block {
  id: string;
  type: string; // Ex: 'text', 'heading', 'button', 'question'
  properties: Record<string, any>; // Propriedades específicas do bloco
}

// Interface para as opções de uma pergunta
export interface QuestionOption {
    id: string;
    text: string;
    imageUrl?: string; // Opcional, para opções com imagem
}

// Interface para o funil (simplificado para este exemplo)
export interface Funnel {
  id: string;
  name: string;
  pages: Page[];
  config: Record<string, any>; // Configurações globais do funil
  version: number;
  isPublished: boolean;
}

// Interface para uma página do funil (simplificado)
export interface Page {
  id: string;
  title: string;
  blocks: Block[];
}

// =====================================================================
// 2. blockDefinitions.ts - Definição dos schemas para cada tipo de bloco
//    (em um projeto real, seria um arquivo separado)
// =====================================================================
// Suponha que 'lucide-react' e 'uuid' são instalados e importados
import { Type, Heading1, RectangleHorizontal, HelpCircle } from 'lucide-react'; // Ícones de exemplo
import { v4 as uuidv4 } from 'uuid'; // Para gerar IDs únicos

export const blockDefinitions = [
  {
    type: 'text',
    label: 'Texto',
    icon: Type,
    propertiesSchema: [
      { key: 'content', label: 'Conteúdo do Texto', type: 'text', defaultValue: 'Parágrafo de texto editável.' },
      { key: 'fontSize', label: 'Tamanho da Fonte', type: 'number', defaultValue: 16 },
      { key: 'textColor', label: 'Cor do Texto', type: 'color', defaultValue: '#333333' },
      { key: 'textAlign', label: 'Alinhamento', type: 'select', defaultValue: 'left',
        options: [
          { label: 'Esquerda', value: 'left' },
          { label: 'Centro', value: 'center' },
          { label: 'Direita', value: 'right' },
        ]
      },
    ],
  },
  {
    type: 'heading',
    label: 'Título',
    icon: Heading1,
    propertiesSchema: [
      { key: 'level', label: 'Nível do Título', type: 'select', defaultValue: 'h1',
        options: [
          { label: 'H1', value: 'h1' },
          { label: 'H2', value: 'h2' },
          { label: 'H3', value: 'h3' },
        ]
      },
      { key: 'content', label: 'Texto do Título', type: 'text', defaultValue: 'Seu Título Aqui' },
      { key: 'fontSize', label: 'Tamanho da Fonte', type: 'number', defaultValue: 32 },
      { key: 'textColor', label: 'Cor do Título', type: 'color', defaultValue: '#1a202c' },
      { key: 'textAlign', label: 'Alinhamento', type: 'select', defaultValue: 'center',
        options: [
          { label: 'Esquerda', value: 'left' },
          { label: 'Centro', value: 'center' },
          { label: 'Direita', value: 'right' },
        ]
      },
    ],
  },
  {
    type: 'button',
    label: 'Botão',
    icon: RectangleHorizontal,
    propertiesSchema: [
      { key: 'text', label: 'Texto do Botão', type: 'text', defaultValue: 'Clique Aqui' },
      { key: 'link', label: 'URL do Link', type: 'url', defaultValue: '#' },
      { key: 'backgroundColor', label: 'Cor de Fundo', type: 'color', defaultValue: '#B89B7A' },
      { key: 'textColor', label: 'Cor do Texto', type: 'color', defaultValue: '#ffffff' },
      { key: 'paddingX', label: 'Preenchimento Horizontal (px)', type: 'number', defaultValue: 24 },
      { key: 'paddingY', label: 'Preenchimento Vertical (px)', type: 'number', defaultValue: 12 },
      { key: 'borderRadius', label: 'Raio da Borda (px)', type: 'number', defaultValue: 8 },
      { key: 'fullWidth', label: 'Largura Total', type: 'boolean', defaultValue: false },
    ],
  },
  {
    type: 'question',
    label: 'Pergunta',
    icon: HelpCircle,
    propertiesSchema: [
      { key: 'questionType', label: 'Tipo de Pergunta', type: 'select', defaultValue: 'single-choice',
        options: [
          { label: 'Múltipla Escolha (1 Opção)', value: 'single-choice' },
          { label: 'Múltipla Escolha (Múltiplas Opções)', value: 'multiple-choice' }, // Não implementado neste exemplo
          { label: 'Resposta Curta', value: 'text-input' },
        ]
      },
      { key: 'questionText', label: 'Texto da Pergunta', type: 'text', defaultValue: 'Qual é a sua cor favorita?' },
      { key: 'options', label: 'Opções de Resposta', type: 'array-of-objects', defaultValue: [],
        itemSchema: [ // Schema para cada item dentro do array de opções
          { key: 'text', label: 'Texto da Opção', type: 'text', defaultValue: '' },
          { key: 'imageUrl', label: 'URL da Imagem (Opcional)', type: 'image', defaultValue: '' },
        ]
      },
      { key: 'placeholder', label: 'Placeholder (para Resposta Curta)', type: 'text', defaultValue: 'Sua resposta...' },
      { key: 'required', label: 'Obrigatória', type: 'boolean', defaultValue: true },
    ],
  },
  // ... outros blocos (Imagem, Vídeo, etc.)
];

// =====================================================================
// 3. componentes/ui/ - Componentes UI básicos para o painel de propriedades
//    (em um projeto real, seriam arquivos separados ou de uma biblioteca UI como Shadcn UI)
// =====================================================================
import { useState, useRef, useEffect, ChangeEvent } from 'react';
import { MinusCircle, PlusCircle, Image as ImageIcon } from 'lucide-react'; // Ícones para o editor de array

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input: React.FC<InputProps> = ({ label, id, ...props }) => (
  <div className="mb-3">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      id={id}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#B89B7A] focus:ring-[#B89B7A] sm:text-sm p-2 border"
      {...props}
    />
  </div>
);

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

const TextArea: React.FC<TextAreaProps> = ({ label, id, ...props }) => (
  <div className="mb-3">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <textarea
      id={id}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#B89B7A] focus:ring-[#B89B7A] sm:text-sm p-2 border min-h-[80px]"
      {...props}
    />
  </div>
);


interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { label: string; value: string }[];
}

const Select: React.FC<SelectProps> = ({ label, id, options, ...props }) => (
  <div className="mb-3">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <select
      id={id}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#B89B7A] focus:ring-[#B89B7A] sm:text-sm p-2 border bg-white"
      {...props}
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ label, value, onChange }) => (
  <div className="mb-3">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type="color"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="mt-1 w-full h-10 border border-gray-300 rounded-md cursor-pointer"
    />
  </div>
);

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, id, ...props }) => (
  <div className="mb-3 flex items-center">
    <input
      id={id}
      type="checkbox"
      className="h-4 w-4 text-[#B89B7A] border-gray-300 rounded focus:ring-[#B89B7A]"
      {...props}
    />
    <label htmlFor={id} className="ml-2 block text-sm text-gray-900">{label}</label>
  </div>
);

// Novo componente para upload de imagem ou URL
interface ImageUploadProps {
    label: string;
    value: string;
    onChange: (url: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ label, value, onChange }) => {
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        // Implementar lógica de upload real aqui (ex: para S3, Cloudinary)
        // Por enquanto, apenas um placeholder ou pode-se usar uma URL direta
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                onChange(reader.result as string); // Para pré-visualização local
            };
            reader.readAsDataURL(file);
            // Em um ambiente real, você faria um upload para um serviço e obteria uma URL pública.
            // Ex: uploadService.upload(file).then(url => onChange(url));
        }
    };

    return (
        <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <div className="flex items-center space-x-2">
                <Input
                    label="" // Rótulo já tratado acima
                    type="url"
                    placeholder="URL da Imagem"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="flex-1"
                />
                <label className="flex items-center justify-center p-2 border border-gray-300 rounded-md cursor-pointer bg-white hover:bg-gray-50">
                    <ImageIcon className="h-5 w-5 text-gray-500" />
                    <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                </label>
            </div>
            {value && value.startsWith('http') && (
                <img src={value} alt="Preview" className="mt-2 max-h-24 object-contain rounded-md border" />
            )}
        </div>
    );
};


// Componente para editar uma lista de objetos (como as opções de uma pergunta)
interface ArrayOfObjectsEditorProps {
  label: string;
  value: Record<string, any>[]; // Array de objetos
  itemSchema: PropertySchema[]; // Schema de cada objeto no array
  onChange: (newValue: Record<string, any>[]) => void;
}

const ArrayOfObjectsEditor: React.FC<ArrayOfObjectsEditorProps> = ({ label, value, itemSchema, onChange }) => {
  const handleAddItem = () => {
    const newItem: Record<string, any> = {};
    itemSchema.forEach(prop => {
      if (prop.defaultValue !== undefined) {
        newItem[prop.key] = prop.defaultValue;
      }
    });
    // Gerar um ID único para cada nova opção
    newItem.id = uuidv4();
    onChange([...value, newItem]);
  };

  const handleRemoveItem = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const handleItemChange = (index: number, key: string, newValue: any) => {
    const updatedValue = [...value];
    updatedValue[index] = { ...updatedValue[index], [key]: newValue };
    onChange(updatedValue);
  };

  return (
    <div className="mb-4 p-3 border border-gray-200 rounded-md bg-gray-50">
      <h4 className="text-sm font-medium text-gray-700 mb-3">{label}</h4>
      {value.map((item, index) => (
        <div key={item.id || index} className="mb-4 p-3 border border-gray-300 rounded-md bg-white relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1 right-1 h-6 w-6 text-red-500 hover:bg-red-50"
            onClick={() => handleRemoveItem(index)}
            title="Remover Opção"
          >
            <MinusCircle className="h-4 w-4" />
          </Button>
          <h5 className="text-xs font-semibold mb-2 text-gray-600">Item #{index + 1}</h5>
          {itemSchema.map(prop => {
            const propValue = item[prop.key];
            const controlId = `prop-${label}-${index}-${prop.key}`;

            switch (prop.type) {
              case 'text':
                return (
                  <Input
                    key={controlId}
                    id={controlId}
                    label={prop.label}
                    value={propValue ?? ''}
                    onChange={(e) => handleItemChange(index, prop.key, e.target.value)}
                  />
                );
              case 'image':
                 return (
                    <ImageUpload
                        key={controlId}
                        label={prop.label}
                        value={propValue ?? ''}
                        onChange={(url) => handleItemChange(index, prop.key, url)}
                    />
                 );
              // Adicione outros tipos de controle se um item do array puder ter outras props
              default:
                return <p key={controlId} className="text-xs text-red-400">Tipo de propriedade não suportado para item: {prop.type}</p>;
            }
          })}
        </div>
      ))}
      <Button variant="outline" className="w-full mt-2" onClick={handleAddItem}>
        <PlusCircle className="h-4 w-4 mr-2" /> Adicionar {label.slice(0, -1) || 'Item'}
      </Button>
    </div>
  );
};


// =====================================================================
// 4. componentes/blocks/ - Componentes React para cada tipo de bloco com edição inline
//    (em um projeto real, seriam arquivos separados)
// =====================================================================

interface BlockComponentProps {
  block: Block;
  isSelected: boolean;
  onSaveInline: (blockId: string, updates: Partial<Block>) => void;
  onBlockSelect: (blockId: string) => void;
}

// TextBlock.tsx (Mantido como antes)
const TextBlock: React.FC<BlockComponentProps> = ({ block, isSelected, onSaveInline, onBlockSelect }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentContent, setCurrentContent] = useState(block.properties.content);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setCurrentContent(block.properties.content);
  }, [block.properties.content]);

  useEffect(() => {
    if (isEditing && textAreaRef.current) {
      textAreaRef.current.focus();
      textAreaRef.current.setSelectionRange(currentContent.length, currentContent.length);
    }
  }, [isEditing, currentContent]);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (currentContent !== block.properties.content) {
      onSaveInline(block.id, { properties: { ...block.properties, content: currentContent } });
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentContent(e.target.value);
  };

  const handleClick = () => {
    onBlockSelect(block.id);
  };

  const style: React.CSSProperties = {
    fontSize: `${block.properties.fontSize || 16}px`,
    color: block.properties.textColor || '#333333',
    textAlign: block.properties.textAlign || 'left',
  };

  return (
    <div
      className={`p-2 relative group ${isSelected ? 'border-2 border-[#B89B7A] outline-dashed outline-1 outline-[#B89B7A]' : 'border-2 border-transparent'} hover:border-gray-300 cursor-pointer transition-all duration-100`}
      onDoubleClick={handleDoubleClick}
      onClick={handleClick}
      style={style}
    >
      {isEditing ? (
        <textarea
          ref={textAreaRef}
          value={currentContent}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full resize-y min-h-[50px] p-1 border rounded focus:outline-none focus:ring-1 focus:ring-[#B89B7A]"
          style={{ ...style, lineHeight: 'normal' }}
        />
      ) : (
        <p className="whitespace-pre-wrap min-h-[20px]">{block.properties.content}</p>
      )}
    </div>
  );
};

// HeadingBlock.tsx (Mantido como antes)
const HeadingBlock: React.FC<BlockComponentProps> = ({ block, isSelected, onSaveInline, onBlockSelect }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentContent, setCurrentContent] = useState(block.properties.content);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setCurrentContent(block.properties.content);
  }, [block.properties.content]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(currentContent.length, currentContent.length);
    }
  }, [isEditing, currentContent]);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (currentContent !== block.properties.content) {
      onSaveInline(block.id, { properties: { ...block.properties, content: currentContent } });
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentContent(e.target.value);
  };

  const handleClick = () => {
    onBlockSelect(block.id);
  };

  const style: React.CSSProperties = {
    fontSize: `${block.properties.fontSize || 32}px`,
    color: block.properties.textColor || '#1a202c',
    textAlign: block.properties.textAlign || 'center',
    fontWeight: 'bold',
  };

  const HeadingTag = block.properties.level as keyof JSX.IntrinsicElements;

  return (
    <div
      className={`p-2 relative group ${isSelected ? 'border-2 border-[#B89B7A] outline-dashed outline-1 outline-[#B89B7A]' : 'border-2 border-transparent'} hover:border-gray-300 cursor-pointer transition-all duration-100`}
      onDoubleClick={handleDoubleClick}
      onClick={handleClick}
    >
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={currentContent}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={(e) => { if (e.key === 'Enter') handleBlur(); }}
          className="w-full p-1 border rounded focus:outline-none focus:ring-1 focus:ring-[#B89B7A]"
          style={{ ...style, lineHeight: 'normal' }}
        />
      ) : (
        <HeadingTag className="min-h-[20px]" style={style}>
          {block.properties.content}
        </HeadingTag>
      )}
    </div>
  );
};

// ButtonBlock.tsx (Mantido como antes)
const ButtonBlock: React.FC<BlockComponentProps> = ({ block, isSelected, onSaveInline, onBlockSelect }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentText, setCurrentText] = useState(block.properties.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setCurrentText(block.properties.text);
  }, [block.properties.text]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(currentText.length, currentText.length);
    }
  }, [isEditing, currentText]);

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (currentText !== block.properties.text) {
      onSaveInline(block.id, { properties: { ...block.properties, text: currentText } });
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentText(e.target.value);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onBlockSelect(block.id);
    if (!isEditing && block.properties.link) {
      // window.open(block.properties.link, '_blank');
    }
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: block.properties.backgroundColor || '#B89B7A',
    color: block.properties.textColor || '#ffffff',
    padding: `${block.properties.paddingY || 12}px ${block.properties.paddingX || 24}px`,
    borderRadius: `${block.properties.borderRadius || 8}px`,
    width: block.properties.fullWidth ? '100%' : 'auto',
    display: 'inline-block',
    textAlign: 'center',
    cursor: 'pointer',
    textDecoration: 'none',
    border: 'none',
    whiteSpace: 'nowrap'
  };

  return (
    <div
      className={`p-2 relative group flex justify-center ${isSelected ? 'border-2 border-[#B89B7A] outline-dashed outline-1 outline-[#B89B7A]' : 'border-2 border-transparent'} hover:border-gray-300 cursor-pointer transition-all duration-100`}
      onClick={handleClick}
    >
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={currentText}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={(e) => { if (e.key === 'Enter') handleBlur(); }}
          className="p-1 border rounded focus:outline-none focus:ring-1 focus:ring-[#B89B7A] text-center"
          style={{ ...buttonStyle, minWidth: '100px' }}
        />
      ) : (
        <button
          style={buttonStyle}
          onDoubleClick={handleDoubleClick}
        >
          {block.properties.text}
        </button>
      )}
    </div>
  );
};


// QuestionBlock.tsx - NOVO COMPONENTE PARA PERGUNTAS
const QuestionBlock: React.FC<BlockComponentProps> = ({ block, isSelected, onSaveInline, onBlockSelect }) => {
    const [isEditingQuestionText, setIsEditingQuestionText] = useState(false);
    const [currentQuestionText, setCurrentQuestionText] = useState(block.properties.questionText);
    const questionTextRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        setCurrentQuestionText(block.properties.questionText);
    }, [block.properties.questionText]);

    useEffect(() => {
        if (isEditingQuestionText && questionTextRef.current) {
            questionTextRef.current.focus();
            questionTextRef.current.setSelectionRange(currentQuestionText.length, currentQuestionText.length);
        }
    }, [isEditingQuestionText, currentQuestionText]);

    const handleDoubleClickQuestionText = () => {
        setIsEditingQuestionText(true);
    };

    const handleBlurQuestionText = () => {
        setIsEditingQuestionText(false);
        if (currentQuestionText !== block.properties.questionText) {
            onSaveInline(block.id, { properties: { ...block.properties, questionText: currentQuestionText } });
        }
    };

    const handleChangeQuestionText = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setCurrentQuestionText(e.target.value);
    };

    const handleClick = () => {
        onBlockSelect(block.id);
    };

    const handleOptionClick = (optionId: string) => {
        // Lógica de seleção de opção para visualização (não salva aqui)
        console.log(`Opção selecionada: ${optionId}`);
    };

    return (
        <div
            className={`p-4 relative group rounded-lg transition-all duration-100 ${
                isSelected ? 'border-2 border-[#B89B7A] outline-dashed outline-1 outline-[#B89B7A]' : 'border-2 border-transparent'
            } hover:border-gray-300 cursor-pointer bg-white shadow-sm`}
            onClick={handleClick}
        >
            <div className="flex flex-col items-center mb-4">
                {isEditingQuestionText ? (
                    <TextArea
                        ref={questionTextRef}
                        label="Texto da Pergunta"
                        value={currentQuestionText}
                        onChange={handleChangeQuestionText}
                        onBlur={handleBlurQuestionText}
                        className="w-full text-center text-xl font-semibold mb-2 p-2 border rounded"
                    />
                ) : (
                    <h2
                        className="text-xl font-semibold text-center mb-2 min-h-[30px]"
                        onDoubleClick={handleDoubleClickQuestionText}
                    >
                        {block.properties.questionText}
                    </h2>
                )}

                {block.properties.questionType === 'single-choice' && (
                    <div className="flex flex-col gap-2 w-full mt-4">
                        {(block.properties.options as QuestionOption[] || []).map((option) => (
                            <button
                                key={option.id}
                                className="w-full p-3 border border-gray-300 rounded-md text-left hover:bg-gray-100 transition-colors flex items-center gap-3"
                                onClick={() => handleOptionClick(option.id)}
                            >
                                {option.imageUrl && (
                                    <img src={option.imageUrl} alt="Opção" className="w-12 h-12 object-cover rounded-md" />
                                )}
                                <span className="flex-1">{option.text}</span>
                            </button>
                        ))}
                    </div>
                )}

                {block.properties.questionType === 'text-input' && (
                    <div className="w-full mt-4">
                        <Input
                            label="Resposta"
                            placeholder={block.properties.placeholder || 'Digite sua resposta aqui...'}
                            value="" // Em modo de edição, não teremos um valor real do usuário
                            readOnly // Apenas para visualização no editor
                            className="w-full"
                        />
                         {block.properties.required && (
                            <span className="text-sm text-red-500 mt-1 block">Campo obrigatório</span>
                        )}
                    </div>
                )}

                {/* Mensagem se o tipo de pergunta não for suportado na visualização */}
                {(!block.properties.questionType || (block.properties.questionType !== 'single-choice' && block.properties.questionType !== 'text-input')) && (
                    <p className="text-sm text-gray-500 mt-4">Tipo de pergunta não visualizável no canvas. Edite no painel de propriedades.</p>
                )}

            </div>
        </div>
    );
};


// Mapeamento de tipos de bloco para seus componentes
const blockComponentMap: Record<string, React.FC<BlockComponentProps>> = {
  text: TextBlock,
  heading: HeadingBlock,
  button: ButtonBlock,
  question: QuestionBlock, // <--- Adicionado o novo bloco de pergunta
  // Adicione outros blocos aqui
};

// =====================================================================
// 5. componentes/panels/DynamicPropertiesPanel.tsx - Painel de propriedades dinâmico
//    (em um projeto real, seria um arquivo separado)
// =====================================================================

interface DynamicPropertiesPanelProps {
  selectedBlock: Block | null;
  funnelConfig: Record<string, any>; // Pode ser usado para configurações globais
  onBlockPropertyChange: (key: string, value: any) => void;
  onNestedPropertyChange: (path: string, value: any) => void; // Para propriedades aninhadas, se houver
  onFunnelConfigChange: (config: Record<string, any>) => void; // Para configurar o funil
}

const DynamicPropertiesPanel: React.FC<DynamicPropertiesPanelProps> = ({
  selectedBlock,
  onBlockPropertyChange,
}) => {
  if (!selectedBlock) {
    return (
      <div className="p-4 text-gray-500 text-center">
        Selecione um bloco para editar suas propriedades.
      </div>
    );
  }

  const definition = blockDefinitions.find(def => def.type === selectedBlock.type);

  if (!definition || !definition.propertiesSchema) {
    return (
      <div className="p-4 text-gray-500 text-center">
        Nenhuma definição de propriedades encontrada para este bloco ({selectedBlock.type}).
      </div>
    );
  }

  // Helper para obter o valor de uma propriedade (incluindo aninhadas)
  const getPropertyValue = (obj: any, path: string) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  };

  // Helper para atualizar propriedades aninhadas
  const updateNestedProperty = (obj: any, path: string, value: any) => {
    const newObj = { ...obj };
    const keys = path.split('.');
    let target: any = newObj;

    for (let i = 0; i < keys.length - 1; i++) {
      if (!target[keys[i]]) {
        target[keys[i]] = {};
      }
      target = target[keys[i]];
    }
    target[keys[keys.length - 1]] = value;
    return newObj;
  };


  return (
    <div className="p-4 h-full overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Propriedades do {definition.label}</h2>
      {definition.propertiesSchema.map((prop) => {
        const value = prop.nestedPath
          ? getPropertyValue(selectedBlock.properties, prop.nestedPath)
          : selectedBlock.properties[prop.key];

        const handleChange = (newValue: any) => {
          if (prop.nestedPath) {
            const newProperties = updateNestedProperty(selectedBlock.properties, prop.nestedPath, newValue);
            onBlockPropertyChange('properties', newProperties); // Atualiza o objeto de propriedades completo
          } else {
            // Este é o cenário mais comum para propriedades de primeiro nível
            onBlockPropertyChange(prop.key, newValue);
          }
        };

        switch (prop.type) {
          case 'text':
            return (
              <Input
                key={prop.key}
                id={`prop-${prop.key}`}
                label={prop.label}
                type="text"
                value={value ?? ''}
                onChange={(e) => handleChange(e.target.value)}
              />
            );
          case 'url':
            return (
                <Input
                  key={prop.key}
                  id={`prop-${prop.key}`}
                  label={prop.label}
                  type="url"
                  value={value ?? ''}
                  onChange={(e) => handleChange(e.target.value)}
                />
              );
          case 'number':
            return (
              <Input
                key={prop.key}
                id={`prop-${prop.key}`}
                label={prop.label}
                type="number"
                value={value ?? ''}
                onChange={(e) => handleChange(Number(e.target.value))}
              />
            );
          case 'color':
            return (
              <ColorPicker
                key={prop.key}
                label={prop.label}
                value={value ?? '#000000'}
                onChange={handleChange}
              />
            );
          case 'select':
            return (
              <Select
                key={prop.key}
                id={`prop-${prop.key}`}
                label={prop.label}
                options={prop.options || []}
                value={value ?? ''}
                onChange={(e) => handleChange(e.target.value)}
              />
            );
          case 'boolean':
            return (
              <Checkbox
                key={prop.key}
                id={`prop-${prop.key}`}
                label={prop.label}
                checked={!!value}
                onChange={(e) => handleChange(e.target.checked)}
              />
            );
          case 'array-of-objects':
            return (
              <ArrayOfObjectsEditor
                key={prop.key}
                label={prop.label}
                value={value || []}
                itemSchema={prop.itemSchema || []}
                onChange={handleChange}
              />
            );
          case 'image':
            return (
                <ImageUpload
                    key={prop.key}
                    label={prop.label}
                    value={value ?? ''}
                    onChange={handleChange}
                />
            );
          default:
            return <p key={prop.key}>Tipo de propriedade desconhecido: {prop.type}</p>;
        }
      })}
    </div>
  );
};


// =====================================================================
// 6. Components principais que simulam o editor (Adaptações do seu código inicial)
//    Isso inclui DndProvider, DroppableCanvas, SchemaDrivenComponentsSidebar
//    e o layout principal SchemaDrivenEditorLayoutV2.
//    (em um projeto real, seriam arquivos separados)
// =====================================================================
import { DndContext, useDroppable, useDraggable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Icons for the header, sidebar, etc.
import {
  Save, Eye, Settings, Plus, Monitor, Tablet, Smartphone, FileText, Users, BarChart3,
  Trash2, Copy, EyeOff, ArrowLeft
} from 'lucide-react';
// Importa de um mock para este exemplo, mas seriam seus componentes reais
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from './components/ui/resizable';

// Mock do hook useSchemaEditor e SyncStatus para este exemplo
const useSchemaEditor = (initialFunnelId?: string) => {
  const [funnel, setFunnel] = useState<Funnel | null>(null);
  const [currentPage, setCurrentPage] = useState<Page | null>(null);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [autoSaveState, setAutoSaveState] = useState({ isEnabled: true, lastSave: new Date() });

  // Simula o carregamento inicial
  useEffect(() => {
    setTimeout(() => {
      if (initialFunnelId) {
        // Simula carregar um funil existente
        setFunnel({
          id: initialFunnelId,
          name: 'Meu Funil de Teste',
          pages: [
            {
              id: 'page-1',
              title: 'Página Inicial',
              blocks: [
                { id: uuidv4(), type: 'heading', properties: { content: 'Bem-vindo ao Meu Funil!', level: 'h1' } },
                { id: uuidv4(), type: 'text', properties: { content: 'Este é um parágrafo de texto de exemplo que você pode editar inline. Dê um clique duplo para começar a editar!', fontSize: 18 } },
                { id: uuidv4(), type: 'button', properties: { text: 'Botão de Ação', link: 'https://exemplo.com', backgroundColor: '#3b82f6', textColor: '#ffffff' } },
                { id: uuidv4(), type: 'question', properties: {
                    questionType: 'single-choice',
                    questionText: 'Qual é o seu esporte favorito?',
                    options: [
                        { id: uuidv4(), text: 'Futebol', imageUrl: 'https://cdn-icons-png.flaticon.com/512/3257/3257748.png' },
                        { id: uuidv4(), text: 'Basquete', imageUrl: 'https://cdn-icons-png.flaticon.com/512/3257/3257748.png' },
                        { id: uuidv4(), text: 'Natação' },
                    ]
                }},
                { id: uuidv4(), type: 'question', properties: {
                    questionType: 'text-input',
                    questionText: 'Conte-nos sobre você:',
                    placeholder: 'Sua história...',
                    required: false
                }}
              ],
            },
            {
              id: 'page-2',
              title: 'Página de Vendas',
              blocks: [
                { id: uuidv4(), type: 'heading', properties: { content: 'Oferta Especial!', level: 'h2' } },
                { id: uuidv4(), type: 'text', properties: { content: 'Aproveite nossa oferta por tempo limitado.', fontSize: 16 } },
              ],
            },
          ],
          config: {},
          version: 1,
          isPublished: false,
        });
      } else {
        // Cria um novo funil se não houver ID
        createNewFunnel();
      }
      setIsLoading(false);
    }, 1000);
  }, [initialFunnelId]);

  useEffect(() => {
    if (funnel && funnel.pages.length > 0 && !currentPage) {
      setCurrentPage(funnel.pages[0]);
    } else if (funnel && currentPage) {
        // Ensure currentPage is always a reference from funnel.pages
        const foundPage = funnel.pages.find(p => p.id === currentPage.id);
        if (foundPage) {
            setCurrentPage(foundPage);
        } else {
            // If the current page was deleted, select the first one
            setCurrentPage(funnel.pages[0] || null);
        }
    }
  }, [funnel, currentPage]);

  const createNewFunnel = () => {
    const newFunnelId = uuidv4();
    const newPageId = uuidv4();
    setFunnel({
      id: newFunnelId,
      name: 'Novo Funil',
      pages: [
        {
          id: newPageId,
          title: 'Página Padrão',
          blocks: [
            { id: uuidv4(), type: 'heading', properties: { content: 'Sua Nova Página', level: 'h1' } },
            { id: uuidv4(), type: 'text', properties: { content: 'Comece a construir seu funil aqui!', fontSize: 16 } },
          ],
        },
      ],
      config: {},
      version: 1,
      isPublished: false,
    });
    setSelectedBlockId(null); // Limpa a seleção
  };

  const loadFunnel = (id: string) => { /* Simular carregamento */ };
  const saveFunnel = (manual?: boolean) => {
    if (isSaving) return;
    setIsSaving(true);
    setAutoSaveState(prev => ({ ...prev, lastSave: new Date() }));
    console.log('Salvando Funil:', funnel);
    setTimeout(() => {
      setIsSaving(false);
      console.log('Funil Salvo!');
    }, 1000);
  };
  const syncWithBackend = () => { console.log('Sincronizando...'); };

  const addPage = (pageTitle: string) => {
    setFunnel(prev => {
      if (!prev) return null;
      const newPage: Page = { id: uuidv4(), title: pageTitle, blocks: [] };
      return { ...prev, pages: [...prev.pages, newPage] };
    });
  };

  const updatePage = (pageId: string, updates: Partial<Page>) => {
    setFunnel(prev => {
      if (!prev) return null;
      const updatedPages = prev.pages.map(page =>
        page.id === pageId ? { ...page, ...updates } : page
      );
      const newFunnel = { ...prev, pages: updatedPages, version: prev.version + 1 };
      return newFunnel;
    });
  };

  const deletePage = (pageId: string) => {
    setFunnel(prev => {
      if (!prev) return null;
      const filteredPages = prev.pages.filter(page => page.id !== pageId);
      return { ...prev, pages: filteredPages, version: prev.version + 1 };
    });
  };

  const handleSetCurrentPage = (pageId: string) => {
    if (funnel) {
      const page = funnel.pages.find(p => p.id === pageId);
      if (page) setCurrentPage(page);
    }
  };

  const addBlock = (blockType: string, position?: number) => {
    if (!currentPage) return;
    const definition = blockDefinitions.find(def => def.type === blockType);
    if (!definition) return;

    const defaultProperties: Record<string, any> = {};
    definition.propertiesSchema?.forEach(prop => {
      if (prop.defaultValue !== undefined) {
        if (prop.nestedPath) {
          let target = defaultProperties;
          const keys = prop.nestedPath.split('.');
          for (let i = 0; i < keys.length - 1; i++) {
            if (!target[keys[i]]) target[keys[i]] = {};
            target = target[keys[i]];
          }
          target[keys[keys.length - 1]] = prop.defaultValue;
        } else {
          defaultProperties[prop.key] = prop.defaultValue;
        }
      }
    });

    const newBlock: Block = {
      id: uuidv4(),
      type: blockType,
      properties: defaultProperties,
    };

    // Caso específico para question block, adicione algumas opções padrão se for single-choice
    if (blockType === 'question' && newBlock.properties.questionType === 'single-choice') {
        newBlock.properties.options = [
            { id: uuidv4(), text: 'Opção 1' },
            { id: uuidv4(), text: 'Opção 2' },
        ];
    }


    updatePage(currentPage.id, {
      blocks: position !== undefined
        ? [...currentPage.blocks.slice(0, position), newBlock, ...currentPage.blocks.slice(position)]
        : [...currentPage.blocks, newBlock]
    });
    setSelectedBlockId(newBlock.id); // Seleciona o novo bloco
  };

  const updateBlock = (blockId: string, updates: Partial<Block>) => {
    if (!currentPage) return;
    setFunnel(prevFunnel => {
        if (!prevFunnel) return null;
        const updatedPages = prevFunnel.pages.map(page => {
            if (page.id === currentPage.id) {
                const updatedBlocks = page.blocks.map(block =>
                    block.id === blockId ? { ...block, ...updates } : block
                );
                return { ...page, blocks: updatedBlocks };
            }
            return page;
        });
        return { ...prevFunnel, pages: updatedPages, version: prevFunnel.version + 1 };
    });
  };


  const deleteBlock = (blockId: string) => {
    if (!currentPage) return;
    updatePage(currentPage.id, {
      blocks: currentPage.blocks.filter(block => block.id !== blockId),
    });
    if (selectedBlockId === blockId) {
      setSelectedBlockId(null);
    }
  };

  const reorderBlocks = (newBlocks: Block[]) => {
    if (!currentPage) return;
    updatePage(currentPage.id, { blocks: newBlocks });
  };

  const selectedBlock = currentPage?.blocks.find(block => block.id === selectedBlockId) || null;

  const updateFunnelConfig = (config: Record<string, any>) => {
    setFunnel(prev => (prev ? { ...prev, config: { ...prev.config, ...config } } : null));
  };
  const updatePageSettings = (pageId: string, settings: Record<string, any>) => { /* Simular */ };
  const getVersionHistory = () => ([{ version: 1, date: new Date() }]);
  const restoreVersion = (version: number) => { console.log(`Restaurando versão ${version}`); };
  const enableAutoSave = () => setAutoSaveState(prev => ({ ...prev, isEnabled: true }));
  const disableAutoSave = () => setAutoSaveState(prev => ({ ...prev, isEnabled: false }));

  return {
    funnel, currentPage, selectedBlock, isLoading, isSaving, autoSaveState,
    currentPageId: currentPage?.id, selectedBlockId, createNewFunnel, loadFunnel, saveFunnel,
    syncWithBackend, addPage, updatePage, deletePage, setCurrentPage: handleSetCurrentPage,
    addBlock, updateBlock, deleteBlock, reorderBlocks, setSelectedBlockId, updateFunnelConfig,
    updatePageSettings, getVersionHistory, restoreVersion, enableAutoSave, disableAutoSave,
  };
};

// Mock do componente SyncStatus (apenas placeholder)
interface SyncStatusProps {
  autoSaveState: { isEnabled: boolean; lastSave: Date };
  isSaving: boolean;
  isOnline: boolean;
  onManualSave: () => void;
  onSync: () => void;
  onToggleAutoSave: () => void;
  compact: boolean;
}
const SyncStatus: React.FC<SyncStatusProps> = ({ autoSaveState, isSaving, isOnline }) => (
  <Badge variant="outline" className="text-xs">
    {isSaving ? 'Salvando...' : autoSaveState.isEnabled ? `Salvo ${new Date(autoSaveState.lastSave).toLocaleTimeString()}` : 'Auto-salvar desativado'}
    {!isOnline && ' (Offline)'}
  </Badge>
);

// Mock do VersionManager (apenas placeholder)
const VersionManager: React.FC<any> = ({ trigger }) => (
  <>
    {trigger}
  </>
);

// DndProvider (Adaptado do seu código)
interface DndProviderProps {
  blocks: Block[];
  onBlocksReorder: (newBlocks: Block[]) => void;
  onBlockAdd: (blockType: string, position?: number) => void;
  onBlockSelect: (blockId: string) => void;
  selectedBlockId: string | null;
  onBlockUpdate: (blockId: string, updates: Partial<Block>) => void;
  children: React.ReactNode;
}

const DndProvider: React.FC<DndProviderProps> = ({
  blocks,
  onBlocksReorder,
  onBlockAdd,
  onBlockSelect,
  selectedBlockId,
  onBlockUpdate,
  children,
}) => {
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id && over?.data.current?.type === 'block') { // Apenas reordenar se soltar em outro bloco
      const oldIndex = blocks.findIndex(block => block.id === active.id);
      const newIndex = blocks.findIndex(block => block.id === over.id);
      onBlocksReorder(arrayMove(blocks, oldIndex, newIndex));
    } else if (active.data.current?.fromSidebar && over?.data.current?.type === 'droppable-canvas') {
        // Se arrastou da sidebar para o canvas, adicione no final ou na posição mais próxima
        const rect = over.rect;
        const middleY = rect.top + rect.height / 2;
        const insertIndex = blocks.findIndex(block => {
            const blockElement = document.getElementById(block.id);
            if (!blockElement) return false;
            const blockRect = blockElement.getBoundingClientRect();
            return event.activatorEvent.clientY < blockRect.top + blockRect.height / 2;
        });
        onBlockAdd(active.data.current.blockType, insertIndex !== -1 ? insertIndex : blocks.length);
    }
  };

  const handleDragOver = (event: any) => {
    // A lógica de `onBlockAdd` já é acionada em `handleDragEnd` se for um item da sidebar no canvas.
    // Esta função `handleDragOver` pode ser usada para feedback visual (ex: indicar onde o bloco será solto).
  };

  return (
    <DndContext onDragEnd={handleDragEnd} onDragOver={handleDragOver}>
      {children}
    </DndContext>
  );
};


// DraggableBlock (para arrastar e soltar blocos no canvas)
interface DraggableBlockProps {
  block: Block;
  children: React.ReactNode;
  onBlockSelect: (blockId: string) => void;
}
const DraggableBlock: React.FC<DraggableBlockProps> = ({ block, children, onBlockSelect }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: block.id,
    data: { type: 'block', blockId: block.id },
  });

  const style = {
    transform: CSS.Transform.translate3d(transform?.x || 0, transform?.y || 0, 0),
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 100 : 'auto',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`relative ${isDragging ? 'dragging' : ''}`}
      onClick={(e) => {
        // e.stopPropagation(); // Pode remover se o clique duplo for o principal para edição
        onBlockSelect(block.id);
      }}
    >
      {children}
    </div>
  );
};


// DroppableCanvas (Adaptado do seu código)
interface DroppableCanvasProps {
  blocks: Block[];
  selectedBlockId: string | null;
  onBlockSelect: (blockId: string) => void;
  onBlockDelete: (blockId: string) => void;
  onBlockDuplicate: (blockId: string) => void;
  onBlockToggleVisibility: (blockId: string) => void;
  onSaveInline: (blockId: string, updates: Partial<Block>) => void;
  onAddBlock: (blockType: string) => void; // Para adicionar blocos diretamente no canvas
}

const DroppableCanvas: React.FC<DroppableCanvasProps> = ({
  blocks,
  selectedBlockId,
  onBlockSelect,
  onBlockDelete,
  onBlockDuplicate,
  onBlockToggleVisibility,
  onSaveInline,
  onAddBlock,
}) => {
  const { setNodeRef } = useDroppable({
    id: 'droppable-canvas',
    data: { type: 'droppable-canvas' },
  });

  return (
    <div ref={setNodeRef} className="min-h-[800px] p-6 relative">
      <SortableContext items={blocks.map(b => b.id)} strategy={verticalListSortingStrategy}>
        {blocks.length === 0 ? (
          <div className="text-center py-16 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Arraste e solte blocos aqui</h3>
            <p className="text-sm">Ou clique no botão "+" para adicionar um novo.</p>
            <Button className="mt-4" onClick={() => onAddBlock('text')}>
                <Plus className="w-4 h-4 mr-2" /> Adicionar Bloco de Texto
            </Button>
            <Button className="mt-2 ml-2" onClick={() => onAddBlock('question')}>
                <Plus className="w-4 h-4 mr-2" /> Adicionar Bloco de Pergunta
            </Button>
          </div>
        ) : (
          blocks.map(block => {
            const BlockComponent = blockComponentMap[block.type];
            if (!BlockComponent) {
              console.warn(`Componente não encontrado para o tipo de bloco: ${block.type}`);
              return <div key={block.id} className="p-4 bg-red-100 text-red-700">Erro: Bloco de tipo desconhecido ({block.type})</div>;
            }

            const isCurrentBlockSelected = block.id === selectedBlockId;
            const isHidden = block.properties?.hidden;

            return (
              <DraggableBlock key={block.id} block={block} onBlockSelect={onBlockSelect}>
                <div id={block.id} className={`relative group ${isHidden ? 'opacity-50 pointer-events-none' : ''}`}>
                  <BlockComponent
                    block={block}
                    isSelected={isCurrentBlockSelected}
                    onSaveInline={onSaveInline}
                    onBlockSelect={onBlockSelect}
                  />
                  {isCurrentBlockSelected && (
                    <div className="absolute -top-6 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                      <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => onBlockDuplicate(block.id)}>
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => onBlockToggleVisibility(block.id)}>
                        {block.properties?.hidden ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                      </Button>
                      <Button variant="destructive" size="icon" className="h-6 w-6" onClick={() => onBlockDelete(block.id)}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>
              </DraggableBlock>
            );
          })
        )}
      </SortableContext>
    </div>
  );
};


// SchemaDrivenComponentsSidebar (Adaptado do seu código)
interface SchemaDrivenComponentsSidebarProps {
  onComponentSelect: (blockType: string) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  funnelPages: Page[];
  currentPageId?: string;
  setCurrentPage: (pageId: string) => void;
}

const SchemaDrivenComponentsSidebar: React.FC<SchemaDrivenComponentsSidebarProps> = ({
  onComponentSelect,
  activeTab,
  onTabChange,
  funnelPages,
  currentPageId,
  setCurrentPage,
}) => {

  const { setNodeRef: setDroppableSidebarRef } = useDroppable({
    id: 'sidebar-droppable',
  });

  return (
    <div className="flex flex-col h-full">
      <div className="p-2 border-b flex justify-around">
        <Button
          variant={activeTab === 'blocks' ? 'default' : 'ghost'}
          onClick={() => onTabChange('blocks')}
          size="sm"
        >
          Blocos
        </Button>
        <Button
          variant={activeTab === 'pages' ? 'default' : 'ghost'}
          onClick={() => onTabChange('pages')}
          size="sm"
        >
          Páginas
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-2" ref={setDroppableSidebarRef}>
        {activeTab === 'blocks' && (
          <div className="flex flex-col gap-1">
            {blockDefinitions.map((def) => (
              <ToolbarButton
                key={def.type}
                blockType={def.type}
                label={def.label}
                icon={def.icon}
                onSelect={() => onComponentSelect(def.type)}
              />
            ))}
          </div>
        )}

        {activeTab === 'pages' && (
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold text-gray-700">Suas Páginas</h3>
            {funnelPages.map((page) => (
              <Button
                key={page.id}
                variant={page.id === currentPageId ? 'default' : 'outline'}
                className="w-full justify-start"
                onClick={() => setCurrentPage(page.id)}
                size="sm"
              >
                {page.title}
              </Button>
            ))}
            <Button variant="outline" className="w-full justify-start mt-2" onClick={() => console.log('Adicionar Nova Página')}>
                <Plus className="w-4 h-4 mr-2" /> Adicionar Página
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

// ToolbarButton para os blocos arrastáveis na sidebar
interface ToolbarButtonProps {
  blockType: string;
  label: string;
  icon: React.ElementType; // Lucide icon component
  onSelect: () => void;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({ blockType, label, icon: Icon, onSelect }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: blockType,
    data: { blockType: blockType, fromSidebar: true }, // Identifica que vem da sidebar
  });

  const style = {
    transform: CSS.Transform.translate3d(transform?.x || 0, transform?.y || 0, 0),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      role="button"
      tabIndex={0}
      aria-disabled="false"
      aria-roledescription="arrastável"
      className="bg-zinc-950/50 relative hover:z-30 rounded border hover:border-gray-400 text-zinc-100 cursor-grab active:cursor-grabbing"
      onClick={onSelect}
    >
      <div className="flex items-center py-2 px-3 gap-2 ease relative">
        <div className="relative w-auto">
          <Icon className="h-4 w-4" />
        </div>
        <div className="text-xs py-1">{label}</div>
      </div>
    </div>
  );
};


// Componente principal do editor (Seu SchemaDrivenEditorLayoutV2 adaptado)
interface SchemaDrivenEditorLayoutV2Props {
  funnelId?: string;
  className?: string;
}

const SchemaDrivenEditorLayoutV2: React.FC<SchemaDrivenEditorLayoutV2Props> = ({
  funnelId,
  className = ''
}) => {
  const [activeTab, setActiveTab] = useState('blocks');
  const [deviceView, setDeviceView] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const {
    funnel,
    currentPage,
    selectedBlock,
    isLoading,
    isSaving,
    autoSaveState,
    currentPageId,
    selectedBlockId,
    createNewFunnel,
    loadFunnel,
    saveFunnel,
    syncWithBackend,
    addPage,
    updatePage,
    deletePage,
    setCurrentPage,
    addBlock,
    updateBlock,
    deleteBlock,
    reorderBlocks,
    setSelectedBlockId,
    updateFunnelConfig,
    updatePageSettings,
    getVersionHistory,
    restoreVersion,
    enableAutoSave,
    disableAutoSave
  } = useSchemaEditor(funnelId);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleComponentSelect = (blockType: string) => {
    addBlock(blockType);
  };

  const handleBlockPropertyChange = (key: string, value: any) => {
    if (!selectedBlockId || !selectedBlock) return;

    // Quando a chave é 'properties', significa que um objeto de propriedades completo foi passado
    // Isso é útil para ArrayOfObjectsEditor que retorna o array inteiro de opções
    if (key === 'properties') {
      updateBlock(selectedBlockId, { properties: value });
    } else {
      // Para propriedades diretas, atualiza individualmente
      updateBlock(selectedBlockId, {
        properties: { ...selectedBlock.properties, [key]: value }
      });
    }
  };

  const handleNestedPropertyChange = (path: string, value: any) => {
    // Esta função pode ser simplificada ou removida se `handleBlockPropertyChange`
    // for robusta o suficiente para lidar com todas as atualizações.
    // Para o ArrayOfObjectsEditor, a mudança já vem formatada para 'properties',
    // então esta função específica para aninhamento talvez não seja tão usada.
    if (!selectedBlockId || !selectedBlock) return;
    const keys = path.split('.');
    const newProperties = { ...selectedBlock.properties };
    let target: any = newProperties;

    for (let i = 0; i < keys.length - 1; i++) {
      if (!target[keys[i]]) target[keys[i]] = {};
      target = target[keys[i]];
    }
    target[keys[keys.length - 1]] = value;
    updateBlock(selectedBlockId, { properties: newProperties });
  };


  const handleInlineEdit = (blockId: string, updates: Partial<Block>) => {
    updateBlock(blockId, updates);
  };

  const handleToggleAutoSave = () => {
    if (autoSaveState.isEnabled) {
      disableAutoSave();
    } else {
      enableAutoSave();
    }
  };

  useEffect(() => {
    if (!funnel && !isLoading && !funnelId) {
      createNewFunnel();
    }
  }, [funnel, isLoading, funnelId, createNewFunnel]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#B89B7A] mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700">Carregando Editor...</h2>
          <p className="text-gray-500">Aguarde enquanto configuramos seu workspace</p>
        </div>
      </div>
    );
  }

  if (!funnel) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Nenhum funil encontrado</h2>
          <Button onClick={createNewFunnel}>
            <Plus className="w-4 h-4 mr-2" />
            Criar Novo Funil
          </Button>
        </div>
      </div>
    );
  }

  return (
    <DndProvider
      blocks={currentPage?.blocks || []}
      onBlocksReorder={(newBlocks) => {
        if (currentPage) {
          updatePage(currentPage.id, { blocks: newBlocks });
        }
      }}
      onBlockAdd={(blockType, position) => {
        if (currentPage) {
          addBlock(blockType, position);
        }
      }}
      onBlockSelect={setSelectedBlockId}
      selectedBlockId={selectedBlockId}
      onBlockUpdate={handleInlineEdit}
    >
      <div className={`h-screen flex flex-col overflow-hidden bg-gray-50 ${className}`}>
        {/* Header */}
        <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4">
          <div className="flex items-center space-x-4">
            {/* Info do funil */}
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-gray-500" />
              <span className="font-medium text-gray-800">{funnel.name}</span>
              <Badge variant={funnel.isPublished ? 'default' : 'secondary'}>
                {funnel.isPublished ? 'Publicado' : 'Rascunho'}
              </Badge>
            </div>

            {/* Info da página atual */}
            {currentPage && (
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>•</span>
                <span>{currentPage.title}</span>
                <Badge variant="outline" className="text-xs">
                  {currentPage.blocks.length} bloco{currentPage.blocks.length !== 1 ? 's' : ''}
                </Badge>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            {/* Status de sincronização compacto */}
            <SyncStatus
              autoSaveState={autoSaveState}
              isSaving={isSaving}
              isOnline={isOnline}
              onManualSave={() => saveFunnel(true)}
              onSync={syncWithBackend}
              onToggleAutoSave={handleToggleAutoSave}
              compact
            />

            {/* Device view controls */}
            <div className="flex border rounded-md">
              <Button
                variant={deviceView === 'mobile' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setDeviceView('mobile')}
                className="rounded-r-none px-2"
              >
                <Smartphone className="w-4 h-4" />
              </Button>
              <Button
                variant={deviceView === 'tablet' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setDeviceView('tablet')}
                className="rounded-none px-2"
              >
                <Tablet className="w-4 h-4" />
              </Button>
              <Button
                variant={deviceView === 'desktop' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setDeviceView('desktop')}
                className="rounded-l-none px-2"
              >
                <Monitor className="w-4 h-4" />
              </Button>
            </div>

            {/* Ações principais */}
            <VersionManager
              versions={getVersionHistory()}
              currentVersion={funnel.version}
              onRestoreVersion={restoreVersion}
              trigger={
                <Button variant="outline" size="sm">
                  <BarChart3 className="w-4 h-4 mr-1" />
                  Versões
                </Button>
              }
            />

            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-1" />
              Preview
            </Button>

            <Button
              size="sm"
              onClick={() => saveFunnel(true)}
              disabled={isSaving}
              className="bg-[#B89B7A] hover:bg-[#a08965]"
            >
              <Save className="w-4 h-4 mr-1" />
              {isSaving ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <ResizablePanelGroup direction="horizontal" className="flex-1">
          {/* Left Sidebar */}
          <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
            <div className="h-full border-r border-gray-200 bg-white flex flex-col">
              <div className="flex-1 overflow-hidden">
                <SchemaDrivenComponentsSidebar
                  onComponentSelect={handleComponentSelect}
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                  funnelPages={funnel.pages}
                  currentPageId={currentPageId ?? undefined}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Central Canvas */}
          <ResizablePanel defaultSize={55}>
            <div className="h-full overflow-auto bg-gray-50">
              <div className="p-8">
                <div className={`mx-auto bg-white min-h-[800px] shadow-lg rounded-lg transition-all duration-300 ${
                  deviceView === 'mobile' ? 'max-w-sm' :
                  deviceView === 'tablet' ? 'max-w-2xl' :
                  'max-w-4xl'
                }`}>
                  <div className="p-6">
                    {/* Canvas Content com Drag & Drop */}
                    <DroppableCanvas
                      blocks={currentPage?.blocks || []}
                      selectedBlockId={selectedBlockId}
                      onBlockSelect={setSelectedBlockId}
                      onBlockDelete={deleteBlock}
                      onBlockDuplicate={(blockId) => {
                        const block = currentPage?.blocks.find(b => b.id === blockId);
                        if (block && currentPage) {
                          const newBlock = {
                            ...block,
                            id: uuidv4() // Novo ID para o duplicado
                          };
                          const blockIndex = currentPage.blocks.findIndex(b => b.id === blockId);
                          const newBlocks = [...currentPage.blocks];
                          newBlocks.splice(blockIndex + 1, 0, newBlock);
                          updatePage(currentPage.id, { blocks: newBlocks });
                        }
                      }}
                      onBlockToggleVisibility={(blockId) => {
                        const block = currentPage?.blocks.find(b => b.id === blockId);
                        if (block && currentPage) {
                          const updatedBlock = {
                            ...block,
                            properties: {
                              ...block.properties,
                              hidden: !block.properties?.hidden
                            }
                          };
                          const newBlocks = currentPage.blocks.map(b =>
                            b.id === blockId ? updatedBlock : b
                          );
                          updatePage(currentPage.id, { blocks: newBlocks });
                        }
                      }}
                      onSaveInline={handleInlineEdit}
                      onAddBlock={addBlock}
                    />

                    {!currentPage && (
                      <div className="text-center py-16 text-gray-500">
                        <h3 className="text-lg font-medium mb-2">Nenhuma página selecionada</h3>
                        <p className="text-sm">Selecione uma página para começar a editar.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Right Properties Panel */}
          <ResizablePanel defaultSize={25} minSize={20} maxSize={35}>
            <div className="h-full border-l border-gray-200 bg-white">
              <DynamicPropertiesPanel
                selectedBlock={selectedBlock}
                funnelConfig={funnel.config}
                onBlockPropertyChange={handleBlockPropertyChange}
                onNestedPropertyChange={handleNestedPropertyChange}
                onFunnelConfigChange={updateFunnelConfig}
              />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </DndProvider>
  );
};

export default SchemaDrivenEditorLayoutV2;

/*
  Para que este código funcione, você precisará ter as seguintes dependências instaladas:
  - react
  - react-dom
  - lucide-react
  - uuid
  - @dnd-kit/core
  - @dnd-kit/sortable
  - @dnd-kit/utilities

  E também precisará de um setup com Tailwind CSS configurado no seu projeto para que os estilos funcionem.
  Os componentes `Button`, `Badge`, `ResizablePanelGroup`, `ResizablePanel`, `ResizableHandle`
  são placeholders que você pode substituir pelos seus componentes reais da Shadcn UI (ou sua biblioteca de componentes).
*/