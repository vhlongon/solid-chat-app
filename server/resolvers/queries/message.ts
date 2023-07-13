import { GraphQLError } from 'graphql';
import { Resolvers } from '../../../generated/resolvers-types';
import { prisma } from '../../../prisma/db';

export const message: Resolvers['Query']['message'] = async (_, { id }) => {
  try {
    const messageResult = await prisma.message.findUnique({
      where: {
        id,
      },
      include: {
        author: true,
      },
    });

    return messageResult;
  } catch (error) {
    console.log(error);
    throw new GraphQLError(`Could not retrieve message with id: ${id}`);
  }
};
