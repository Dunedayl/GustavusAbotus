import Discord from 'discord.js';
import { Command } from "../command.model";
import { aniptikoTexts } from "../../../static/aniptiko-text.static";

export class AniptikoCommand implements Command {
    public readonly name: string = 'аниптико';

    public handle(message: Discord.Message, ...args: string[]): void {
        const item = aniptikoTexts[Math.floor(Math.random() * aniptikoTexts.length)];
        message.reply('\n' + item);
    }
}