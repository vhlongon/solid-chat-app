import { GraphQLError } from 'graphql';
import { Resolvers } from '../../../generated/resolvers-types';
import { createMessage as createMessageHelper } from '../../helpers';
import { messagesData, usersData } from '../../data';
import { publishMessages } from '../../subscriptions';

export const createMessage: Resolvers['Mutation']['createMessage'] = (
  _,
  { content },
  { pubSub, userId }
) => {
  if (!userId) {
    throw new GraphQLError('Not authenticated');
  }

  const user = usersData.find((user) => user.id === userId);

  if (!user) {
    throw new GraphQLError('Not authenticated');
  }

  const message = createMessageHelper(content, user);
  messagesData.push(message);
  publishMessages(pubSub, messagesData);
  return message;
};
