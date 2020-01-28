import moment from "moment";
import { DefaultConfig } from "../config/default.config";
import { LogLevelPriority, LogLevelString } from "../config/logging/log-level.model";

function formatMessage(level: LogLevelString, message: string) {
    const dateFormat = "YYYY/MM/DD HH:mm:ss SSS ZZ";
    const datetimeStamp = moment(Date.now()).format(dateFormat);
    return datetimeStamp + " [" + level + "] " + message;
}

export function log(level: LogLevelString, message: string, context?: any): void {
    const logLevelPriority = LogLevelPriority[level];
    const configLevelPriority = LogLevelPriority[DefaultConfig.logLevel];

    if (logLevelPriority < configLevelPriority) { return; }

    message = formatMessage(level, message);
    context ? console.log(message, context) : console.log(message);
}

export function info(message: string, context?: any): void {
    log('INFO', message, context);
}

export function warn(message: string, context?: any): void {
    log('WARN', message, context);
}

export function error(message: string, context?: any): void {
    log('ERROR', message, context);
}

export function debug(message: string, context?: any): void {
    log('DEBUG', message, context);
}