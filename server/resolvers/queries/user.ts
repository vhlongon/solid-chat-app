import { GraphQLError } from 'graphql';
import { Resolvers } from '../../../generated/resolvers-types';
import { prisma } from '../../../prisma/db';

export const user: Resolvers['Query']['user'] = async (_, { id }) => {
  try {
    return await prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        messages: true,
      },
    });
  } catch (error) {
    console.log(error);
    throw new GraphQLError(`Could not retrieve user with id: ${id}`);
  }
};
