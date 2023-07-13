import { GraphQLError } from 'graphql';
import { Resolvers } from '../../../generated/resolvers-types';
import { prisma } from '../../../prisma/db';

export const me: Resolvers['Query']['me'] = async (_, __, { userId }) => {
  try {
    const me = prisma.user.findUnique({
      where: {
        id: String(userId),
      },
      include: {
        messages: true,
      },
    });

    return me;
  } catch (error) {
    console.log(error);
    throw new GraphQLError(`Could not retrieve user with id ${userId}`);
  }
};
