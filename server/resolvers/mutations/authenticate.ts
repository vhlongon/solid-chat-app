import { GraphQLError } from 'graphql';
import { Resolvers } from '../../../generated/resolvers-types';
import { createToken } from '../../auth';
import { usersData } from '../../data';
import { getAccessToken, getGithubUser } from '../../github';
import { createUser } from '../../helpers';

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

    const userInData = usersData.find(
      (user) => user.id === String(githubUser.id)
    );

    let user;

    if (!userInData) {
      user = createUser({
        id: String(githubUser.id),
        username: githubUser.login,
        email: githubUser.email,
        imageUrl: githubUser.avatar_url,
      });
      usersData.push(user);
    } else {
      user = userInData;
    }

    return {
      user,
      token: createToken(user.id),
    };
  } catch (error) {
    throw new GraphQLError(JSON.stringify(error));
  }
};
