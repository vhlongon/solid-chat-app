import { GraphQLError } from 'graphql';
import { Resolvers } from '../../../generated/resolvers-types';
import { prisma } from '../../../prisma/db';

export const messages: Resolvers['Query']['messages'] = async () => {
  try {
    const result = await prisma.message.findMany({
      include: {
        author: true,
      },
    });

    return result;
  } catch (error) {
    console.log(error);
    throw new GraphQLError('Could not retrieve messages');
  }
};
