import fs from "fs";
import { DefaultConfig } from "../config/default.config";
import { info } from "../common/logging";

info('Loading Aniptiko Texts...');

export const aniptikoTexts = fs.readFileSync(
    DefaultConfig.pathToAniptikoFolder + "/data.txt",
    "utf-8"
).split('\n\n');