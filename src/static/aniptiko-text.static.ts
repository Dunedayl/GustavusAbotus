import fs from "fs";
import { DefaultConfig } from "../config/default.config";
import { Logger } from "../common/logger";

Logger.info('Loading Aniptiko Texts...');

export const aniptikoTexts = fs.readFileSync(
    DefaultConfig.pathToAniptikoFolder + "/data.txt",
    "utf-8"
).split('\n\n');