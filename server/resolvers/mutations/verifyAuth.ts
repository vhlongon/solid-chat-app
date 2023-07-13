import { GraphQLError } from 'graphql';
import { Resolvers } from '../../../generated/resolvers-types';
import { prisma } from '../../../prisma/db';
import { getUserIdFromToken } from '../../auth';

export const verifyAuth: Resolvers['Mutation']['verifyAuth'] = async (_, { token }) => {
  try {
    const userId = getUserIdFromToken(token);

    if (!userId) {
      throw new Error('Failed to get user id');
    }

    const result = await prisma.user.findUnique({
      where: {
        id: String(userId),
      },
    });

    return result;
  } catch (error) {
    console.log(error);
    throw new GraphQLError(`Could not verify user`);
  }
};
