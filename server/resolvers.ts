import { GraphQLError } from 'graphql';
import { Message, Resolvers, User } from '../generated/resolvers-types';
import { createMessage, createUser } from './helpers';
import { publishMessages, subscribeToMessages } from './subscriptions';

const users: User[] = [createUser({ id: '1' })];
const messages: Message[] = [];

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
  Mutation: {
    createMessage: (_, { content, userId }, { pubSub }) => {
      const user = users.find((user) => user.id === userId);

      if (!user) {
        throw new GraphQLError('User not found');
      }

      const message = createMessage(content, user);
      messages.push(message);
      publishMessages(pubSub, messages);
      return message;
    },
    deleteMessage: (_, { id }, { pubSub }) => {
      const message = messages.find((message) => message.id === id);

      if (message) {
        messages.splice(messages.indexOf(message), 1);
        publishMessages(pubSub, messages);
        return true;
      }

      return false;
    },
    updateMessage: (_, { id, content }, { pubSub }) => {
      const message = messages.find((message) => message.id === id);

      if (message) {
        message.content = content;
        publishMessages(pubSub, messages);
        return message;
      }

      throw new GraphQLError('Message not found');
    },
  },
  Subscription: {
    messages: {
      subscribe: (_, __, { pubSub }) => subscribeToMessages(pubSub),
    },
  },
};
