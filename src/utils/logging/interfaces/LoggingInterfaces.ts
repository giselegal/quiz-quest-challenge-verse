// Interfaces compartilhadas para evitar imports circulares no sistema de logging

export interface LogLevel {
    TRACE: 0;
    DEBUG: 1;
    INFO: 2;
    WARN: 3;
    ERROR: 4;
    FATAL: 5;
}

export interface LogEntry {
    timestamp: string;
    level: keyof LogLevel;
    context: string;
    message: string;
    data?: any;
    sessionId?: string;
    userId?: string;
    stackTrace?: string;
    performance?: {
        duration?: number;
        memory?: number;
    };
}

export interface LogTransport {
    log(entry: LogEntry): Promise<void> | void;
    flush?(): Promise<void>;
    close?(): Promise<void>;
}

export interface LogFilter {
    shouldLog(entry: LogEntry): boolean;
}

export interface LogFormatter {
    format(entry: LogEntry): string;
}

export interface LoggerConfig {
    level: keyof LogLevel;
    context: string;
    transports: LogTransport[];
    filters: LogFilter[];
    formatter: LogFormatter;
    sessionId?: string;
    userId?: string;
    enablePerformanceTracking: boolean;
    enableStackTrace: boolean;
}