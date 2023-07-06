import { Resolvers } from '../../../generated/resolvers-types';
import { messagesData } from '../../data';
import { publishMessages } from '../../subscriptions';

export const deleteMessage: Resolvers['Mutation']['deleteMessage'] = (
  _,
  { id },
  { pubSub }
) => {
  const message = messagesData.find((message) => message.id === id);

  if (message) {
    messagesData.splice(messagesData.indexOf(message), 1);
    publishMessages(pubSub, messagesData);
    return true;
  }

  return false;
};
