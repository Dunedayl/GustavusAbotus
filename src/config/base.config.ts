import { LogLevel } from "./logging/log-level.model";

export interface BaseConfig {
    token: string,
    prefix: string,
    logLevel: LogLevel,
    onJoinSoundsEnabled: boolean,
    pathToNamikoFolder: string,
    pathToAniptikoFolder: string,
}