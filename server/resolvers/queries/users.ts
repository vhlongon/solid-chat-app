import { GraphQLError } from 'graphql';
import { Resolvers } from '../../../generated/resolvers-types';
import { prisma } from '../../../prisma/db';

export const users: Resolvers['Query']['users'] = async () => {
  try {
    return await prisma.user.findMany({
      include: {
        messages: true,
      },
    });
  } catch (error) {
    console.log(error);
    throw new GraphQLError('Could not retrieve users');
  }
};
