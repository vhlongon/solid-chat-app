import { Resolvers } from '../../../generated/resolvers-types';
import { subscribeToMessages } from '../../helpers';

export const messagesSubscription: Resolvers['Subscription']['messages'] = {
  subscribe: (_, __, { pubSub }) => subscribeToMessages(pubSub),
};
