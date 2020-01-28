import { LogLevel } from "./logging/log-level.model";

export interface BaseConfig {
    token: string,
    prefix: string,
    logLevel: LogLevel,
    pathToNamikoFolder: string,
    pathToAniptikoFolder: string
}