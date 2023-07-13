import { GraphQLError } from 'graphql';
import { Resolvers } from '../../../generated/resolvers-types';
import { prisma } from '../../../prisma/db';

export const UserModel: Resolvers['User'] = {
  email: (user) => user.email,
  id: (user) => user.id,
  isLogged: (user) => Boolean(user.isLogged),
  messages: async (user) => {
    try {
      const messages = await prisma.message.findMany({
        where: {
          authorId: user.id,
        },
      });

      return messages;
    } catch (error) {
      console.log(error);
      throw new GraphQLError('Could not retrieve messages');
    }
  },
  username: (user) => user.username,
  imageUrl: (user) => user.imageUrl,
};
