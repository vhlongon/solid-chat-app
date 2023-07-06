import { Message } from '../generated/graphql';
import { PubSub } from './types';

export const MESSAGES_CHANNEL = 'MESSAGES_CHANNEL';

export const publishMessages = (pubSub: PubSub, messages: Message[]) => {
  pubSub.publish(MESSAGES_CHANNEL, { messages });
};

export const subscribeToMessages = (pubSub: PubSub) => {
  return pubSub.subscribe(MESSAGES_CHANNEL);
};
