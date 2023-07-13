import { GraphQLError } from 'graphql';
import { Resolvers } from '../../../generated/resolvers-types';
import { prisma } from '../../../prisma/db';
import { createToken } from '../../auth';
import { getAccessToken, getGithubUser } from '../../github';
import { publishUsers } from '../../subscriptions';

export const authenticate: Resolvers['Mutation']['authenticate'] = async (_, { accessCode }, { pubSub }) => {
  try {
    const accessToken = await getAccessToken(accessCode);

    if (!accessToken) {
      throw new Error('Failed to fetch access token');
    }

    const githubUser = await getGithubUser(accessToken);

    if (!githubUser) {
      throw new Error('Failed to fetch github user');
    }

    const user =
      (await prisma.user.update({
        where: {
          id: String(githubUser.id),
        },
        data: {
          isLogged: true,
        },
      })) ||
      (await prisma.user.create({
        data: {
          email: githubUser.email,
          id: String(githubUser.id),
          imageUrl: githubUser.avatar_url || 'https://via.placeholder.com/150',
          username: githubUser.login,
          isLogged: true,
        },
      }));

    const allUsers = await prisma.user.findMany({});

    publishUsers(
      pubSub,
      allUsers.map((user) => ({ ...user, isLogged: Boolean(user.isLogged) }))
    );

    return {
      user: user,
      token: createToken(user?.id),
    };
  } catch (error) {
    console.log(error);
    throw new GraphQLError(`Could not authenticate user ${JSON.stringify(error)}`);
  }
};
