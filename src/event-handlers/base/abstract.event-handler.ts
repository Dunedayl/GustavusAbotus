import Discord from 'discord.js';
import { Logger } from "../../common/logger";


export abstract class AbstractEventHandler {
    public constructor(bot: Discord.Client) {
        Logger.info(`Initializing ${this.getInstanceName()}`);
        this.init(bot);
        Logger.info(`Initialized ${this.getInstanceName()}`);
    }

    protected abstract init(bot: Discord.Client): Discord.Client;

    protected getInstanceName(): string {
        return this.constructor.name;
    }
}