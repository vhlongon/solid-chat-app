import { Message, Resolvers, User } from '../generated/resolvers-types';
import { createMessage, createUser } from './helpers';

const message1 = createMessage('message1 text', createUser({ id: '1' }));
const message2 = createMessage('message2 text', createUser({ id: '2' }));
const user1 = createUser({ id: '1', messages: [message1] });
const user2 = createUser({ id: '2', messages: [message2] });

const messages = [message1, message2];

const users = [user1, user2];

export const resolvers: Resolvers = {
  Query: {
    users: () => {
      return users;
    },
    user: (_, { id }) => {
      return users.find((user) => user.id === id) || null;
    },
    messages: (_) => {
      return messages;
    },
    message: (_, { id }) => {
      return messages.find((message) => message.id === id) || null;
    },
  },
  User: {
    email: (parent: User) => {
      return parent.email;
    },
    id: (parent: User) => {
      return parent.id;
    },
    messages: (parent: User) => {
      return parent.messages;
    },
    username: (parent: User) => {
      return parent.username;
    },
    __isTypeOf: (parent: User) => {
      return parent.__typename === 'User';
    },
  },
  Message: {
    content: (parent: Message) => {
      return parent.content;
    },
    createdAt: (parent: Message) => {
      return parent.createdAt;
    },
    id: (parent: Message) => {
      return parent.id;
    },
    user: (parent: Message) => {
      return parent.user;
    },
    __isTypeOf: (parent: Message) => {
      return parent.__typename === 'Message';
    },
  },
};
