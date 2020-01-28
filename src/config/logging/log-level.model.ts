export type LogLevelString = 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';

export enum LogLevel {
    INFO = 'INFO',
    WARN = 'WARN',
    ERROR = 'ERROR',
    DEBUG = 'DEBUG',
}

export enum LogLevelPriority {
    DEBUG,
    ERROR,
    WARN,
    INFO,
}
