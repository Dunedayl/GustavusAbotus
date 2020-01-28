import { Command } from "./command.model";
import { TimeCommand } from "./commands/time.command";
import { AniptikoCommand } from "./commands/aniptiko.command";
import { AnyaptikoCommand } from "./commands/anyaptiko.command";
import { InstagramCommand } from "./commands/instagram.command";
import { StickerCommand } from "./commands/sitcker.command";


export const commandRepository: Command[] = [
    new TimeCommand(),
    new AniptikoCommand(),
    new AnyaptikoCommand(),
    new InstagramCommand(),
    new StickerCommand(),
];