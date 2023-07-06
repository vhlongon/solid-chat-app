import { Resolvers } from '../../../generated/resolvers-types';
import { messagesData } from '../../data';

export const message: Resolvers['Query']['message'] = (_, { id }) =>
  messagesData.find((message) => message.id === id) || null;
