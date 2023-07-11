import { Message, Resolvers } from '../../../generated/resolvers-types';
import { subscribeToMessages } from '../../subscriptions';

export const messagesSubscription: Resolvers['Subscription']['messages'] = {
  subscribe: (_, __, { pubSub }) => subscribeToMessages(pubSub),
  resolve: (payload: { messages: Message[] }) => {
    return payload.messages;
  },
};
