// Exemplo de uso dos snippets ES7 React
import React from 'react';

// 1. Digite "rafce" e pressione Tab para criar este componente:
interface ExemploSnippetsProps {
  title: string;
}

const ExemploSnippets: React.FC<ExemploSnippetsProps> = ({ title }) => {
  // 2. Digite "useState" e pressione Tab:
  const [count, setCount] = React.useState(0);
  
  // 3. Digite "useEffect" e pressione Tab:
  React.useEffect(() => {
    console.log('Component mounted');
  }, []);

  // 4. Digite "useCallback" e pressione Tab:
  const handleClick = React.useCallback(() => {
    setCount(prev => prev + 1);
  }, []);

  // 5. Digite "useMemo" e pressione Tab:
  const expensiveValue = React.useMemo(() => {
    return count * 2;
  }, [count]);

  return (
    <div>
      <h1>{title}</h1>
      <p>Count: {count}</p>
      <p>Expensive Value: {expensiveValue}</p>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
};

export default ExemploSnippets;

// Outros exemplos de snippets úteis:

// Digite "clg" + Tab:
console.log('Debug message');

// Digite "clo" + Tab (exemplo com variável):
// console.log('count', count);

// Digite "dob" + Tab (exemplo com props):
// const { title: pageTitle } = props;

// Digite "dar" + Tab (exemplo com array):
// const [first, second] = myArray;

// Digite "anfn" + Tab:
const myFunction = () => {
  // código aqui
};

// Outros imports úteis:
// Digite "imp" + Tab: import moduleName from 'module';
// Digite "imd" + Tab: import { destructured } from 'module';
// Digite "ime" + Tab: import * as alias from 'module';

// ===== SNIPPETS AVANÇADOS PARA REACT =====

// 1. CUSTOM HOOKS (Digite "uch" + Tab):
const useCounter = (initialValue = 0) => {
  const [count, setCount] = React.useState(initialValue);
  
  const increment = React.useCallback(() => {
    setCount(prev => prev + 1);
  }, []);
  
  const decrement = React.useCallback(() => {
    setCount(prev => prev - 1);
  }, []);
  
  const reset = React.useCallback(() => {
    setCount(initialValue);
  }, [initialValue]);
  
  return { count, increment, decrement, reset };
};

// 2. CONTEXT SETUP (Digite "rccontext" + Tab):
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light');
  
  const toggleTheme = React.useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 3. REDUCER SETUP (Digite "ureducer" + Tab):
interface CounterState {
  count: number;
  loading: boolean;
  error: string | null;
}

type CounterAction = 
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'RESET' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

const counterReducer = (state: CounterState, action: CounterAction): CounterState => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'DECREMENT':
      return { ...state, count: state.count - 1 };
    case 'RESET':
      return { ...state, count: 0 };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

// 4. COMPONENTE COM FORWARDREF (Digite "forwardRef" + Tab):
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

const CustomButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, onClick, variant = 'primary' }, ref) => {
    return (
      <button
        ref={ref}
        onClick={onClick}
        className={`btn btn-${variant}`}
      >
        {children}
      </button>
    );
  }
);

CustomButton.displayName = 'CustomButton';

// 5. MEMO COMPONENT (Digite "memo" + Tab):
interface MemoComponentProps {
  title: string;
  count: number;
}

const MemoComponent = React.memo<MemoComponentProps>(({ title, count }) => {
  console.log('MemoComponent renderizado');
  
  return (
    <div>
      <h3>{title}</h3>
      <p>Count: {count}</p>
    </div>
  );
});

MemoComponent.displayName = 'MemoComponent';

// 6. LAZY LOADING (Digite "lazy" + Tab):
const LazyComponent = React.lazy(() => import('./LazyComponent'));

const ComponentWithSuspense: React.FC = () => {
  return (
    <React.Suspense fallback={<div>Carregando...</div>}>
      <LazyComponent />
    </React.Suspense>
  );
};

// 7. ERROR BOUNDARY (Digite "rcep" + Tab):
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{}>,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Algo deu errado!</h2>
          <p>{this.state.error?.message}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

// 8. PORTAL (Digite "portal" + Tab):
const Modal: React.FC<{ children: React.ReactNode; isOpen: boolean }> = ({ 
  children, 
  isOpen 
}) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
      </div>
    </div>,
    document.body
  );
};

// 9. REFS E IMPERATIVE HANDLE (Digite "useImperativeHandle" + Tab):
interface InputRefType {
  focus: () => void;
  clear: () => void;
}

const CustomInput = React.forwardRef<InputRefType, { placeholder?: string }>(
  ({ placeholder }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    
    React.useImperativeHandle(ref, () => ({
      focus: () => inputRef.current?.focus(),
      clear: () => {
        if (inputRef.current) {
          inputRef.current.value = '';
        }
      }
    }));
    
    return <input ref={inputRef} placeholder={placeholder} />;
  }
);

// 10. ASYNC EFFECTS (Digite "useAsyncEffect" + Tab):
const useAsyncEffect = (
  effect: () => Promise<void>,
  deps: React.DependencyList
) => {
  React.useEffect(() => {
    effect();
  }, deps);
};

// Exemplo de uso dos snippets avançados:
const AdvancedExample: React.FC = () => {
  const { count, increment, decrement, reset } = useCounter(0);
  const [loading, setLoading] = React.useState(false);
  const inputRef = React.useRef<InputRefType>(null);
  
  // Digite "useAsyncEffect" + Tab:
  useAsyncEffect(async () => {
    setLoading(true);
    try {
      // Simular chamada async
      await new Promise(resolve => setTimeout(resolve, 1000));
    } finally {
      setLoading(false);
    }
  }, []);
  
  const handleFocus = React.useCallback(() => {
    inputRef.current?.focus();
  }, []);
  
  const handleClear = React.useCallback(() => {
    inputRef.current?.clear();
  }, []);
  
  if (loading) {
    return <div>Carregando dados...</div>;
  }
  
  return (
    <ErrorBoundary>
      <div>
        <h2>Exemplo Avançado</h2>
        <p>Count: {count}</p>
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
        <button onClick={reset}>Reset</button>
        
        <CustomInput ref={inputRef} placeholder="Digite algo..." />
        <button onClick={handleFocus}>Focus Input</button>
        <button onClick={handleClear}>Clear Input</button>
        
        <MemoComponent title="Memo Component" count={count} />
        
        <ComponentWithSuspense />
      </div>
    </ErrorBoundary>
  );
};

// ===== SNIPPETS PARA TYPESCRIPT =====

// 1. INTERFACE (Digite "interface" + Tab):
interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

// 2. TYPE ALIAS (Digite "type" + Tab):
type Status = 'idle' | 'loading' | 'success' | 'error';

// 3. GENERIC TYPE (Digite "generic" + Tab):
type Optional<T> = {
  [K in keyof T]?: T[K];
};

// 4. UNION TYPE (Digite "union" + Tab):
type Theme = 'light' | 'dark' | 'auto';

// 5. MAPPED TYPE (Digite "mapped" + Tab):
type Readonly<T> = {
  readonly [K in keyof T]: T[K];
};

// ===== SNIPPETS PARA TESTING =====

// 1. TESTE BÁSICO (Digite "test" + Tab):
describe('ExemploSnippets', () => {
  it('should render correctly', () => {
    // Arrange
    const props = { title: 'Test Title' };
    
    // Act
    const result = render(<ExemploSnippets {...props} />);
    
    // Assert
    expect(result.getByText('Test Title')).toBeInTheDocument();
  });
  
  it('should increment count when button is clicked', () => {
    // Arrange
    const props = { title: 'Test' };
    const { getByText } = render(<ExemploSnippets {...props} />);
    
    // Act
    fireEvent.click(getByText('Increment'));
    
    // Assert
    expect(getByText('Count: 1')).toBeInTheDocument();
  });
});

// 2. MOCK (Digite "mock" + Tab):
const mockFunction = jest.fn();
const mockModule = jest.mock('./module', () => ({
  default: mockFunction
}));

// ===== SNIPPETS PARA PERFORMANCE =====

// 1. DEBOUNCE HOOK (Digite "useDebounce" + Tab):
const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// 2. THROTTLE HOOK (Digite "useThrottle" + Tab):
const useThrottle = <T>(value: T, delay: number): T => {
  const [throttledValue, setThrottledValue] = React.useState<T>(value);
  const lastExecuted = React.useRef<number>(Date.now());

  React.useEffect(() => {
    if (Date.now() >= lastExecuted.current + delay) {
      lastExecuted.current = Date.now();
      setThrottledValue(value);
    } else {
      const timerId = setTimeout(() => {
        lastExecuted.current = Date.now();
        setThrottledValue(value);
      }, delay);

      return () => clearTimeout(timerId);
    }
  }, [value, delay]);

  return throttledValue;
};

export { 
  ExemploSnippets, 
  AdvancedExample, 
  useCounter, 
  useDebounce, 
  useThrottle,
  ThemeProvider,
  CustomButton,
  ErrorBoundary
};
