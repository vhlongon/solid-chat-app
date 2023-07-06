import { v4 as uuidv4 } from 'uuid';
import { Message, User } from '../generated/resolvers-types';

export const createMessage = (content: string, user: User): Message => {
  return {
    id: uuidv4(),
    content,
    createdAt: new Date().toISOString(),
    user,
    __typename: 'Message',
  };
};

export const createUser = ({
  id = uuidv4(),
  username = `${id}-username`,
  email = `${username}@test.com`,
  messages,
}: Partial<User>): User => {
  return {
    id,
    username,
    email,
    messages: messages || [],
    __typename: 'User',
  };
};
