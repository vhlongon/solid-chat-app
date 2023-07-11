import { v4 as uuidv4 } from 'uuid';
import { Message, User } from '../generated/resolvers-types';
import { PubSub } from './types';

export const createMessage = ({
  content,
  author,
  isOwner,
}: Pick<Message, 'content' | 'author' | 'isOwner'>): Message => {
  return {
    id: uuidv4(),
    content,
    createdAt: new Date().toISOString(),
    author,
    __typename: 'Message',
    isOwner,
  };
};

export const createUser = ({
  id = uuidv4(),
  username = `${id}-username`,
  email = `${username}@test.com`,
  imageUrl = 'https://via.placeholder.com/150',
  messages,
}: Partial<User>): User => {
  return {
    id,
    username,
    email,
    imageUrl,
    messages: messages || [],
    __typename: 'User',
  };
};

export const MESSAGES_CHANNEL = 'MESSAGES_CHANNEL';

export const publishMessages = (pubSub: PubSub, messages: Message[]) => {
  pubSub.publish(MESSAGES_CHANNEL, { messages });
};

export const subscribeToMessages = (pubSub: PubSub) => {
  return pubSub.subscribe(MESSAGES_CHANNEL);
};
