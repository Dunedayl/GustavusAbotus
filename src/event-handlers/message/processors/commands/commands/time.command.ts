import Discord from 'discord.js';
import moment from 'moment';
import { Command } from "../command.model";

export class TimeCommand implements Command {
    readonly name: string = 'time';

    handle(message: Discord.Message, ...args: string[]): void {
        let now = moment();
        let then = moment(new Date(2020, 0, 30, 17, 0, 0));
        let ms = then.fromNow();
        let d = moment.duration(ms);
        let text = "Саня узнает свою судьбу " + ms;
        message.reply(text);
    }
}