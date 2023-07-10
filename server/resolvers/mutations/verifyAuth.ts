import { GraphQLError } from 'graphql';
import { Resolvers } from '../../../generated/resolvers-types';
import { getUserIdFromToken } from '../../auth';
import { usersData } from '../../data';

export const verifyAuth: Resolvers['Mutation']['verifyAuth'] = async (
  _,
  { token }
) => {
  try {
    const userId = getUserIdFromToken(token);

    if (!userId) {
      throw new Error('Failed to get user id');
    }

    const userInData = usersData.find((user) => user.id === String(userId));

    return userInData || null;
  } catch (error) {
    throw new GraphQLError(JSON.stringify(error));
  }
};
