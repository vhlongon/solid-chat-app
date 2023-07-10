import { Resolvers } from '../../../generated/resolvers-types';

export const MessageModel: Resolvers['Message'] = {
  content: (message) => message.content,
  createdAt: (message) => message.createdAt,
  id: (message) => message.id,
  author: (message) => message.author,
  isOwner: (message, args, context) => message.author.id === context.userId,
};
