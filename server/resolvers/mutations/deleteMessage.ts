import { GraphQLError } from 'graphql';
import { Message } from '../../../generated/graphql';
import { Resolvers } from '../../../generated/resolvers-types';
import { prisma } from '../../../prisma/db';
import { publishMessages } from '../../subscriptions';

export const deleteMessage: Resolvers['Mutation']['deleteMessage'] = async (_, { id }, { pubSub, userId }) => {
  if (!userId) {
    throw new GraphQLError('Not authenticated');
  }

  try {
    const result = await prisma.message.delete({
      where: {
        id,
        AND: {
          authorId: userId,
        },
      },
    });

    if (!result) {
      throw new GraphQLError('Cannot delete message');
    }

    const messagesData = await prisma.message.findMany({
      include: {
        author: true,
      },
    });

    publishMessages(pubSub, messagesData as unknown as Message[]);

    return true;
  } catch (error) {
    console.log(error);
    throw new GraphQLError(`Fail to delete message with id ${id}`);
  }
};
