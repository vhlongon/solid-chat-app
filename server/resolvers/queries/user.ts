import { Resolvers } from '../../../generated/resolvers-types';
import { usersData } from '../../data';

export const user: Resolvers['Query']['user'] = (_, { id }) =>
  usersData.find((user) => user.id === id) || null;