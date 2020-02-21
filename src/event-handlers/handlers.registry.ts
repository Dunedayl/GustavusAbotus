import { ReadyEventHandler } from "./ready/event.handler";
import { MessageEventHandler } from "./message/event.handler";
import { BaseRegistry } from "../common/registry";
import { AbstractEventHandler } from "./base/abstract.event-handler";
import { VoiceStateUpdateEventHandler } from "./voiceStateUpdate/event.handler";


class EventHandlersRegistry extends BaseRegistry<AbstractEventHandler> {
    protected _classes = [
        ReadyEventHandler,
        MessageEventHandler,
        VoiceStateUpdateEventHandler,
    ];
}

export const eventHandlersRegistry = new EventHandlersRegistry();