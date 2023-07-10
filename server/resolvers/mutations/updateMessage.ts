import { GraphQLError } from 'graphql';
import { Resolvers } from '../../../generated/resolvers-types';
import { messagesData } from '../../data';
import { publishMessages } from '../../subscriptions';

export const updateMessage: Resolvers['Mutation']['updateMessage'] = (
  _,
  { id, content },
  { pubSub, userId }
) => {
  if (!userId) {
    throw new GraphQLError('Not authenticated');
  }

  const message = messagesData.find((message) => message.id === id);
  const isOwner = message?.user.id === userId;

  if (isOwner) {
    message.content = content;
    publishMessages(pubSub, messagesData);
    return message;
  }

  throw new GraphQLError('Cannot update message');
};
