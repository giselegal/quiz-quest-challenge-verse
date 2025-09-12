// Serviço de Logging Simplificado - Sem Imports Circulares
import { LogEntry, LogLevel } from './interfaces/LoggingInterfaces';

export class SimpleLoggerService {
    private static instance: SimpleLoggerService;
    private logs: LogEntry[] = [];
    private maxLogs = 1000;

    private constructor() { }

    static getInstance(): SimpleLoggerService {
        if (!SimpleLoggerService.instance) {
            SimpleLoggerService.instance = new SimpleLoggerService();
        }
        return SimpleLoggerService.instance;
    }

    private createLogEntry(level: keyof LogLevel, context: string, message: string, data?: any): LogEntry {
        return {
            timestamp: new Date().toISOString(),
            level,
            context,
            message,
            data,
            sessionId: this.getSessionId()
        };
    }

    private getSessionId(): string {
        if (typeof window !== 'undefined') {
            let sessionId = sessionStorage.getItem('logger_session_id');
            if (!sessionId) {
                sessionId = Math.random().toString(36).substr(2, 9);
                sessionStorage.setItem('logger_session_id', sessionId);
            }
            return sessionId;
        }
        return 'server-' + Math.random().toString(36).substr(2, 9);
    }

    private writeLog(entry: LogEntry): void {
        this.logs.push(entry);

        // Limitar número de logs em memória
        if (this.logs.length > this.maxLogs) {
            this.logs = this.logs.slice(-this.maxLogs / 2);
        }

        // Console output baseado no nível
        const consoleMethods = {
            TRACE: console.trace,
            DEBUG: console.debug,
            INFO: console.info,
            WARN: console.warn,
            ERROR: console.error,
            FATAL: console.error
        };

        const method = consoleMethods[entry.level] || console.log;
        method(`[${entry.timestamp}] [${entry.level}] [${entry.context}] ${entry.message}`, entry.data || '');
    }

    // Métodos públicos simplificados
    trace(context: string, message: string, data?: any): void {
        this.writeLog(this.createLogEntry('TRACE', context, message, data));
    }

    debug(context: string, message: string, data?: any): void {
        this.writeLog(this.createLogEntry('DEBUG', context, message, data));
    }

    info(context: string, message: string, data?: any): void {
        this.writeLog(this.createLogEntry('INFO', context, message, data));
    }

    warn(context: string, message: string, data?: any): void {
        this.writeLog(this.createLogEntry('WARN', context, message, data));
    }

    error(context: string, message: string, data?: any): void {
        this.writeLog(this.createLogEntry('ERROR', context, message, data));
    }

    fatal(context: string, message: string, data?: any): void {
        this.writeLog(this.createLogEntry('FATAL', context, message, data));
    }

    // Métodos utilitários
    getLogs(): LogEntry[] {
        return [...this.logs];
    }

    clearLogs(): void {
        this.logs = [];
    }

    exportLogs(): string {
        return JSON.stringify(this.logs, null, 2);
    }
}

// Export singleton instance
export const logger = SimpleLoggerService.getInstance();