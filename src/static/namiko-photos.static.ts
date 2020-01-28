import fs from "fs";
import { DefaultConfig } from "../config/default.config";
import { info } from "../common/logging";

info('Loading Namiko Photos...');

export const namikoPhotos = fs.readdirSync(DefaultConfig.pathToNamikoFolder);