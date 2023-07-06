import { GraphQLError } from 'graphql';
import { Resolvers } from '../../../generated/resolvers-types';
import { messagesData } from '../../data';
import { publishMessages } from '../../subscriptions';

export const updateMessage: Resolvers['Mutation']['updateMessage'] = (
  _,
  { id, content },
  { pubSub }
) => {
  const message = messagesData.find((message) => message.id === id);

  if (message) {
    message.content = content;
    publishMessages(pubSub, messagesData);
    return message;
  }

  throw new GraphQLError('Message not found');
};
