import moment from "moment";
import { DefaultConfig } from "../config/default.config";
import { LogLevel, LogLevelPriority, LogLevelString } from "../config/logging/log-level.model";


class _Logger {
    public info(message: string, context?: any): void {
        this.log('INFO', message, context);
    }

    public warn(message: string, context?: any): void {
        this.log('WARN', message, context);
    }

    public error(message: string, context?: any): void {
        this.log('ERROR', message, context);
    }

    public debug(message: string, context?: any): void {
        this.log('DEBUG', message, context);
    }

    public log(level: LogLevelString, message: string, context?: any): void {
        const logLevelPriority = LogLevelPriority[level];
        const configLevelPriority = LogLevelPriority[DefaultConfig.logLevel];

        if (logLevelPriority < configLevelPriority) { return; }

        const loggerFunction = this.getLoggerFunction(level);
        message = this.formatMessage(level, message);
        context ? loggerFunction(message, context) : loggerFunction(message);
    }

    protected formatMessage(level: LogLevelString, message: string) {
        const dateFormat = "YYYY/MM/DD HH:mm:ss SSS ZZ";
        const datetimeStamp = moment(Date.now()).format(dateFormat);
        return datetimeStamp + " [" + level + "] " + message;
    }

    protected getLoggerFunction(level: LogLevelString): (message?: any, ...optionalParams: any[]) => void {
        return {
            [LogLevel.INFO]: console.info,
            [LogLevel.DEBUG]: console.debug,
            [LogLevel.ERROR]: console.error,
            [LogLevel.WARN]: console.warn,
        }[level];
    }
}

export const Logger = new _Logger();