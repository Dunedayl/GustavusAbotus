import Discord from 'discord.js';
import { userRepository } from "./user.repository";


export function processUser(message: Discord.Message) {
    const user = userRepository.find(x => x.id === message.author.id);

    if (user === undefined) { return }

    user.reactions.forEach((value, index) => message.react(value));
}