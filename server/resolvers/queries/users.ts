import { Resolvers } from '../../../generated/resolvers-types';
import { usersData } from '../../data';

export const users: Resolvers['Query']['users'] = () => usersData;
