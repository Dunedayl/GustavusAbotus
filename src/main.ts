import Discord from 'discord.js';

import { DefaultConfig } from "./config/default.config";
import { eventHandlersRegistry } from "./event-handlers/handlers.registry";


const bot = new Discord.Client();

eventHandlersRegistry.init(bot);
bot.login(DefaultConfig.token);