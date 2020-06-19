import { DefaultConfig } from "../../../../../config/default.config";

export function buildPathToNamikoPhoto(fileName: string): string {
    return DefaultConfig.pathToNamikoFolder + "/" + fileName;
}
