import Discord from 'discord.js';
import { commandRepository } from './command.repository';
import { Logger } from "../../common/logger";

export function processCommand(prefix: string, message: Discord.Message) {
    const [commandName, ...args] = message.content.substring(prefix.length).split(" ");
    const commandHandler = commandRepository.find(x => x.name === commandName);

    if (commandHandler === undefined) { return; }

    Logger.info('Handling `' + commandName + '` command.');
    commandHandler.handle(message, ...args);
}