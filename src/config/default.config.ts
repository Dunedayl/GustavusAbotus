import dotenv from 'dotenv';

import { BaseConfig } from "./base.config";
import { LogLevel } from "./logging/log-level.model";

dotenv.config();

function isTrue(value: string): boolean {
    value = value.toLowerCase();
    return ['1', 'true', 'yes'].some(x => x === value);
}

export const DefaultConfig: BaseConfig = {
    prefix: "!",
    logLevel: LogLevel.ERROR,
    pathToNamikoFolder: "./static/namiko",
    pathToAniptikoFolder: "./static/aniptiko",

    get token() { return process.env.DISCORD_TOKEN as string },
    get onJoinSoundsEnabled() { return  isTrue(process.env.ON_JOIN_SOUNDS_ENABLED || '') },
};