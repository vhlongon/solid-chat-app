import { GraphQLError } from 'graphql';
import { Resolvers } from '../../../generated/resolvers-types';
import { messagesData } from '../../data';
import { publishMessages } from '../../subscriptions';

export const deleteMessage: Resolvers['Mutation']['deleteMessage'] = (
  _,
  { id },
  { pubSub, userId }
) => {
  if (!userId) {
    throw new GraphQLError('Not authenticated');
  }

  const message = messagesData.find((message) => message.id === id);
  const isOwner = message?.author.id === userId;

  if (isOwner) {
    messagesData.splice(messagesData.indexOf(message), 1);
    publishMessages(pubSub, messagesData);
    return true;
  }

  throw new GraphQLError('Cannot delete message');
};
