import { GraphQLError } from 'graphql';
import { Resolvers } from '../../../generated/resolvers-types';
import { prisma } from '../../../prisma/db';
import { createToken } from '../../auth';
import { getAccessToken, getGithubUser } from '../../github';

export const authenticate: Resolvers['Mutation']['authenticate'] = async (
  _,
  { accessCode }
) => {
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
      (await prisma.user.findUnique({
        where: {
          id: String(githubUser.id),
        },
      })) ||
      (await prisma.user.create({
        data: {
          email: githubUser.email,
          id: String(githubUser.id),
          imageUrl: githubUser.avatar_url || 'https://via.placeholder.com/150',
          username: githubUser.login,
        },
      }));

    return {
      user: user,
      token: createToken(user?.id),
    };
  } catch (error) {
    console.log(error);
    throw new GraphQLError(
      `Could not authenticate user ${JSON.stringify(error)}`
    );
  }
};
