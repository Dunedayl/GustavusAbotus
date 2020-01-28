import Discord from 'discord.js';

import { DefaultConfig } from "./config/default.config";
import { processCommand } from "./processors/commands/command.processor";
import { processUser } from "./processors/user/user.processor";
import { info } from "./common/logging";

const bot = new Discord.Client();

bot.on('ready', () => {
    info('Bot Started.');
});

bot.on('message', (message: Discord.Message) => {
    processUser(message);
    processCommand(DefaultConfig.prefix, message);
});

bot.login(DefaultConfig.token);