import Discord from 'discord.js';
import { AbstractEventHandler } from '../base/abstract.event-handler';
import { Logger } from "../../common/logger";


export class ReadyEventHandler extends AbstractEventHandler {
    protected init(bot: Discord.Client): Discord.Client {
        return bot.on('ready', () => {
            Logger.info('Bot Started.');
        });
    }
}