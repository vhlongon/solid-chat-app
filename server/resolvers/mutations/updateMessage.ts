import { GraphQLError } from 'graphql';
import { Message } from '../../../generated/graphql';
import { Resolvers } from '../../../generated/resolvers-types';
import { prisma } from '../../../prisma/db';
import { publishMessages } from '../../subscriptions';

export const updateMessage: Resolvers['Mutation']['updateMessage'] = async (
  _,
  { id, content },
  { pubSub, userId }
) => {
  if (!userId) {
    throw new GraphQLError('Not authenticated');
  }

  try {
    const result = await prisma.message.update({
      where: {
        id,
        AND: {
          authorId: userId,
        },
      },
      data: {
        content,
      },
      include: {
        author: true,
      },
    });

    if (!result) {
      throw new GraphQLError('Cannot update message');
    }

    const messagesData = await prisma.message.findMany({
      include: {
        author: true,
      },
    });

    publishMessages(pubSub, messagesData as unknown as Message[]);

    return result;
  } catch (error) {
    console.log(error);
    throw new GraphQLError(`Fail to update message with id ${id}`);
  }
};
