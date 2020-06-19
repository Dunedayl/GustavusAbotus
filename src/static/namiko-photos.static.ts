import fs from "fs";
import { DefaultConfig } from "../config/default.config";
import { Logger } from "../common/logger";

Logger.info('Loading Namiko Photos...');

export const namikoPhotos = fs.readdirSync(DefaultConfig.pathToNamikoFolder);