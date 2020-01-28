import Discord from 'discord.js';
import { commandRepository } from './command.repository';
import { info } from "../../common/logging";

export function processCommand(prefix: string, message: Discord.Message) {
    const [commandName, ...args] = message.content.substring(prefix.length).split(" ");
    const commandHandler = commandRepository.find(x => x.name === commandName);

    if (commandHandler === undefined) { return; }

    info('Handling `' + commandName + '` command.');
    commandHandler.handle(message, ...args);
}