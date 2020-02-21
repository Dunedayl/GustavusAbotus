import Discord from 'discord.js';
import { AbstractEventHandler } from '../base/abstract.event-handler';
import { Logger } from "../../common/logger";


export class VoiceStateUpdateEventHandler extends AbstractEventHandler {
    protected init(bot: Discord.Client): Discord.Client {
        /* Emitted whenever a user changes voice state - e.g. joins/leaves a channel, mutes/unmutes.
        PARAMETER    TYPE             DESCRIPTION
        oldMember    GuildMember      The member before the voice state update
        newMember    GuildMember      The member after the voice state update    */
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

    private handleUserLeftChannel(member: Discord.GuildMember): void {
        Logger.info(`${member.user.username} has left ${member.voiceChannel.name}`);
    }

    private handleUserJoinedChannel(member: Discord.GuildMember): void {
        Logger.info(`${member.user.username} has joined ${member.voiceChannel.name}`);
    }

    private handleUserChangedChannel(oldMember: Discord.GuildMember, newMember: Discord.GuildMember): void {
        Logger.info(`${newMember.user.username} changed channel from ${oldMember.voiceChannel.name} to ${newMember.voiceChannel.name}`);
    }
}