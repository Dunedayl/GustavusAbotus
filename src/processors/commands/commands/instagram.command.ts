import Discord from 'discord.js';
import request from "request";
import { Command } from "../command.model";
import { Logger } from "../../../common/logger";

export class InstagramCommand implements Command {
    public readonly name = 'instagram';

    protected readonly instagramUrlPattern = "https://www.instagram.com/sololomka/?__a=1&max_id={end_cursor}";
    protected options = { json: true };
    protected temp: any[] = [];

    constructor() {
        this.doRequest();
    }

    public handle(message: Discord.Message, ...args: string[]): void {
        const photo = this.temp[Math.floor(Math.random() * this.temp.length)];
        message.reply("Фото Намико https://www.instagram.com/p/" + photo + "/");
    }

    protected doRequest(): void {
        Logger.info('Loading instagram photos...');
        request(this.instagramUrlPattern, this.options, this.requestCallback.bind(this));
    }

    protected requestCallback(error: any, res: request.Response, body: any): void {
        if (error) {
            return Logger.error(error);
        }

        if (res.statusCode == 200) {
            const edges = body['graphql']['user']['edge_owner_to_timeline_media']['edges'];
            edges.forEach((element: any) => {
                if (element['node']['is_video'] == false) {
                    this.temp.push(element['node']['shortcode']);
                }
            });
            Logger.info('Successfully loaded instagram photos.');
        }
    }
}