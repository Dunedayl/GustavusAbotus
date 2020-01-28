import Discord from 'discord.js';
import { Command } from "../command.model";
import { buildPathToNamikoPhoto } from "../common/utils";
import { namikoPhotos } from "../../../static/namiko-photos.static";

export class AnyaptikoCommand implements Command {
    public readonly name: string = 'аняптико';

    public handle(message: Discord.Message, ...args: string[]): void {
        const photo = namikoPhotos[Math.floor(Math.random() * namikoPhotos.length)];
        message.reply("Фото Намико ", { files: [buildPathToNamikoPhoto(photo)] });
    }
}