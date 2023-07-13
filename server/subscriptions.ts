import { Message, User } from '../generated/graphql';
import { PubSub } from './types';

export const MESSAGES_CHANNEL = 'MESSAGES_CHANNEL';

export const publishMessages = (pubSub: PubSub, messages: Message[]) => {
  pubSub.publish(MESSAGES_CHANNEL, { messages });
};

export const subscribeToMessages = (pubSub: PubSub) => {
  return pubSub.subscribe(MESSAGES_CHANNEL);
};

export const USERS_CHANNEL = 'USERS_CHANNEL';

export const publishUsers = (pubSub: PubSub, users: User[]) => {
  pubSub.publish(USERS_CHANNEL, { users });
};

export const subscribeToUsers = (pubSub: PubSub) => {
  return pubSub.subscribe(USERS_CHANNEL);
};
