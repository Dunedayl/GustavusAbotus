import { Command } from "./command.model";
import { TimeCommand } from "./commands/time.command";
import { AniptikoCommand } from "./commands/aniptiko.command";
import { AnyaptikoCommand } from "./commands/anyaptiko.command";
import { InstagramCommand } from "./commands/instagram.command";
import { StickerCommand } from "./commands/sitcker.command";
import { BaseRegistry } from "../../../../common/registry";


class CommandRegistry extends BaseRegistry<Command> {
    protected _classes = [
        TimeCommand,
        AniptikoCommand,
        AnyaptikoCommand,
        InstagramCommand,
        StickerCommand,
    ];
}

export const commandRegistry = new CommandRegistry().init();