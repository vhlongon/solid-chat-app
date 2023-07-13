import { Resolvers, User } from '../../../generated/resolvers-types';
import { subscribeToUsers } from '../../subscriptions';

export const usersSubscription: Resolvers['Subscription']['users'] = {
  subscribe: (_, __, { pubSub }) => subscribeToUsers(pubSub),
  resolve: (payload: { users: User[] }) => {
    return payload.users.map((user) => ({
      ...user,
      createdAt: new Date(),
    }));
  },
};
