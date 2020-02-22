import Discord from 'discord.js';
import ytdl from 'ytdl-core';

import { AbstractEventHandler } from '../base/abstract.event-handler';
import { Logger } from "../../common/logger";
import { DefaultConfig } from "../../config/default.config";


export class VoiceStateUpdateEventHandler extends AbstractEventHandler {
    protected init(bot: Discord.Client): Discord.Client {
        /*
            Emitted whenever a user changes voice state - e.g. joins/leaves a channel, mutes/unmutes.
            PARAMETER    TYPE             DESCRIPTION
            oldMember    GuildMember      The member before the voice state update
            newMember    GuildMember      The member after the voice state update
        */
        return bot.on('voiceStateUpdate', (oldMember, newMember) => {
            if (!newMember.voiceChannelID) {
                return this.handleUserLeftChannel(oldMember);
            }

            if (!oldMember.voiceChannelID) {
                return this.handleUserJoinedChannel(newMember);
            }

            return this.handleUserChangedChannel(oldMember, newMember);
        });
    }

    protected handleUserLeftChannel(member: Discord.GuildMember): void {
        Logger.info(`${member.user.username} has left ${member.voiceChannel.name}`);

        if (member.user.bot) {
            return;
        }
    }

    protected handleUserJoinedChannel(member: Discord.GuildMember): void {
        Logger.info(`${member.user.username} has joined ${member.voiceChannel.name}`);

        if (member.user.bot) {
            return;
        }

        if (DefaultConfig.onJoinSoundsEnabled && member.voiceChannel.joinable) {
            this.playYoutube('https://www.youtube.com/watch?v=SfpMNAyKILc', member);
        }
    }

    protected handleUserChangedChannel(oldMember: Discord.GuildMember, newMember: Discord.GuildMember): void {
        Logger.info(`${newMember.user.username} changed channel from ${oldMember.voiceChannel.name} to ${newMember.voiceChannel.name}`);

        if (oldMember.user.bot) {
            return;
        }
    }

    private playYoutube(url: string, member: Discord.GuildMember): void {
        const voiceChannelLogName = `${member.voiceChannel.name} voice channel`;
        const discordStreamOptions: Discord.StreamOptions = { seek: 0, volume: 1 };
        const youtubeStreamOptions: ytdl.downloadOptions = { filter : 'audioonly' };

        member.voiceChannel.join().then(connection => {
            const stream = ytdl(url, youtubeStreamOptions);
            const dispatcher = connection.playStream(stream, discordStreamOptions);
            dispatcher.on("end", end => {
                connection.disconnect();
            });
        }).catch(error => Logger.error(`Got unexpected error while connecting to ${voiceChannelLogName}`, error));
    }
}