import { GraphQLError } from 'graphql';
import { Resolvers } from '../../../generated/resolvers-types';
import { prisma } from '../../../prisma/db';
import { publishUsers } from '../../subscriptions';

export const logout: Resolvers['Mutation']['logout'] = async (_, args, { pubSub, userId }) => {
  if (!userId) {
    throw new GraphQLError('Not authenticated');
  }

  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        isLogged: false,
      },
    });

    const allUsers = await prisma.user.findMany();

    publishUsers(
      pubSub,
      allUsers.map((user) => ({ ...user, isLogged: Boolean(user.isLogged) }))
    );

    return true;
  } catch (error) {
    console.log(error);
    throw new GraphQLError(`Fail to logout user with id ${userId}`);
  }
};
