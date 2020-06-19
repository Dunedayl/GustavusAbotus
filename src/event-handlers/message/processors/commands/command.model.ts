import Discord from 'discord.js';

export abstract class Command {
    public abstract readonly name: string;
    public abstract handle(message: Discord.Message, ...args: string[]): void;
}