import Discord from 'discord.js';
import { Command } from "../command.model";
import { buildPathToNamikoPhoto } from "../common/utils";
import { namikoPhotos } from "../../../static/namiko-photos.static";

export class StickerCommand implements Command {
    public readonly name: string = 'sticker';

    protected readonly emojiNameRegex = /^<:(?<emojiName>\d+|\w+):(?<emojiId>\d+)>$/;

    public handle(message: Discord.Message, ...args: string[]): void {
        const [discordStickerName] = args;
        const regexGroups = this.emojiNameRegex.exec(discordStickerName);

        let targetStickerFileName = null;
        if (regexGroups) {
            targetStickerFileName = namikoPhotos.find(
                x => regexGroups.groups && x.split('.')[0] === regexGroups.groups.emojiName
            );

            if (targetStickerFileName !== undefined) {
                message.reply('', { files: [buildPathToNamikoPhoto(targetStickerFileName)] });
            }
        }
    }
}