import Discord from 'discord.js';
import { AbstractEventHandler } from "../base/abstract.event-handler";
import { processUser } from "./processors/user/user.processor";
import { processCommand } from "./processors/commands/command.processor";
import { DefaultConfig } from "../../config/default.config";


export class MessageEventHandler extends AbstractEventHandler {
    protected init(bot: Discord.Client): Discord.Client {
        return bot.on('message', (message: Discord.Message) => {
            processUser(message);
            processCommand(DefaultConfig.prefix, message);
        });
    }
}