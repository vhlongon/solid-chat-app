import { GraphQLError } from 'graphql';
import { Message } from '../../../generated/graphql';
import { Resolvers } from '../../../generated/resolvers-types';
import { prisma } from '../../../prisma/db';
import { publishMessages } from '../../subscriptions';

export const createMessage: Resolvers['Mutation']['createMessage'] = async (
  _,
  { content },
  { pubSub, userId }
) => {
  if (!userId) {
    throw new GraphQLError('Not authenticated');
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        messages: true,
      },
    });

    if (!user) {
      throw new GraphQLError('User not found');
    }

    const result = await prisma.message.create({
      data: {
        content,
        isOwner: true,
        author: {
          connect: {
            id: userId,
          },
        },
      },
    });
    const messagesData = await prisma.message.findMany({
      include: {
        author: true,
      },
    });

    publishMessages(pubSub, messagesData as unknown as Message[]);
    return result;
  } catch (error) {
    console.log(error);
    throw new GraphQLError('Fail to create message');
  }
};
