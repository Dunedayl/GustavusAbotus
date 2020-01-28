import dotenv from 'dotenv';

import { BaseConfig } from "./base.config";
import { LogLevel } from "./logging/log-level.model";

dotenv.config();

export const DefaultConfig: BaseConfig = {
    token: process.env.DISCORD_TOKEN as string,
    prefix: "!",
    logLevel: LogLevel.ERROR,
    pathToNamikoFolder: "./static/namiko",
    pathToAniptikoFolder: "./static/aniptiko"
};