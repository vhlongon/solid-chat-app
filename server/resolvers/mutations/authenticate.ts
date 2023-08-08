import { GraphQLError } from 'graphql';
import { Message, Resolvers } from '../../../generated/resolvers-types';
import { prisma } from '../../../prisma/db';
import { createToken } from '../../auth';
import { getAccessToken, getGithubUser } from '../../github';
import { publishMessages, publishUsers } from '../../subscriptions';

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

    const hasUser = await prisma.user.findUnique({
      where: {
        id: String(githubUser.id),
      },
    });

    const user = hasUser
      ? await prisma.user.update({
          where: {
            id: String(githubUser.id),
          },
          data: {
            isLogged: true,
          },
        })
      : await prisma.user.create({
          data: {
            email: githubUser.email,
            id: String(githubUser.id),
            imageUrl: githubUser.avatar_url || 'https://via.placeholder.com/150',
            username: githubUser.login,
            isLogged: true,
          },
        });

    const allUsers = await prisma.user.findMany({});

    publishUsers(
      pubSub,
      allUsers.map((user) => ({ ...user, isLogged: Boolean(user.isLogged) }))
    );

    const messagesData = await prisma.message.findMany({
      include: {
        author: true,
      },
    });

    publishMessages(pubSub, messagesData as unknown as Message[]);

    return {
      user: user,
      token: createToken(user?.id),
    };
  } catch (error) {
    console.log(error);
    throw new GraphQLError(`Could not authenticate user ${JSON.stringify(error)}`);
  }
};
