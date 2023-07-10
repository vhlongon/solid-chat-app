import { Resolvers } from '../../../generated/resolvers-types';
import { usersData } from '../../data';

export const me: Resolvers['Query']['me'] = (_, __, { userId }) =>
  usersData.find((user) => user.id === userId) || null;
