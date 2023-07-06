import { Resolvers } from '../../../generated/resolvers-types';
import { messagesData } from '../../data';

export const messages: Resolvers['Query']['messages'] = () => messagesData;
