// src/utils/logging/index.ts
// Entry point para o sistema de logging

// Core classes - usando o serviço simplificado
export { SimpleLoggerService, logger } from './SimpleLoggerService';
import { logger } from './SimpleLoggerService';

// Core interfaces from shared interfaces
export type {
    LogLevel,
    LogEntry,
    LogTransport,
    LogFilter,
    LogFormatter
} from './interfaces/LoggingInterfaces';

// Import for type alias
import { SimpleLoggerService } from './SimpleLoggerService';

// Utility type for external usage
export type LoggerInstance = SimpleLoggerService;

// Função factory para compatibilidade
export const getLogger = () => logger;
