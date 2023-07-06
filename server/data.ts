import { Message, User } from '../generated/resolvers-types';
import { createUser } from './helpers';

export const usersData: User[] = [createUser({ id: '1' })];
export const messagesData: Message[] = [];
