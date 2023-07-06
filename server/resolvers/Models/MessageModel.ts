import { Resolvers } from '../../../generated/resolvers-types';

export const MessageModel: Resolvers['Message'] = {
  content: (message) => message.content,
  createdAt: (message) => message.createdAt,
  id: (message) => message.id,
  user: (message) => message.user,
};
