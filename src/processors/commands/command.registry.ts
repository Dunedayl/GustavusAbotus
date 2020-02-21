import { TimeCommand } from "./commands/time.command";
import { AniptikoCommand } from "./commands/aniptiko.command";
import { AnyaptikoCommand } from "./commands/anyaptiko.command";
import { InstagramCommand } from "./commands/instagram.command";
import { StickerCommand } from "./commands/sitcker.command";


const _commandRegistry = [
    TimeCommand,
    AniptikoCommand,
    AnyaptikoCommand,
    InstagramCommand,
    StickerCommand,
];


export const commandRegistry = _commandRegistry.map(cls => new cls());