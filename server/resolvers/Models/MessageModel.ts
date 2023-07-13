import { GraphQLError } from 'graphql';
import { User } from '../../../generated/graphql';
import { Resolvers } from '../../../generated/resolvers-types';
import { prisma } from '../../../prisma/db';

export const MessageModel: Resolvers['Message'] = {
  content: (message) => message.content,
  createdAt: (message) => message.createdAt.toISOString(),
  id: (message) => message.id,
  author: async (message) => {
    try {
      const author = (await prisma.user.findUnique({
        where: {
          id: message.authorId,
        },
      })) as User;

      return { ...author, createdAt: new Date() };
    } catch (error) {
      console.log(error);
      throw new GraphQLError(`Could not retrieve author for message with id ${message.id}`);
    }
  },
  isOwner: async (message) => {
    const isOwner = await prisma.message.findUnique({
      where: {
        id: message.id,
      },
      select: {
        isOwner: true,
      },
    });
    return Boolean(isOwner?.isOwner);
  },
};
