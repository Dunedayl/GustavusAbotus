import Discord from 'discord.js';
import { commandRegistry } from './command.registry';
import { Logger } from "../../../../common/logger";

export function processCommand(prefix: string, message: Discord.Message) {
    const [commandName, ...args] = message.content.substring(prefix.length).split(" ");
    const commandHandler = commandRegistry.instances.find(x => x.name === commandName);

    if (commandHandler === undefined) { return; }

    Logger.info('Handling `' + commandName + '` command.');
    commandHandler.handle(message, ...args);
}