import { Resolvers } from '../../../generated/resolvers-types';

export const UserModel: Resolvers['User'] = {
  email: (user) => user.email,
  id: (user) => user.id,
  messages: (user) => user.messages,
  username: (user) => user.username,
  imageUrl: (user) => user.imageUrl,
};
