import { Resolvers } from '../generated/resolvers-types';
import { MessageModel } from './resolvers/Models/MessageModel';
import { UserModel } from './resolvers/Models/UserModel';
import { createMessage } from './resolvers/mutations/createMessage';
import { deleteMessage } from './resolvers/mutations/deleteMessage';
import { updateMessage } from './resolvers/mutations/updateMessage';
import { message } from './resolvers/queries/message';
import { messages } from './resolvers/queries/messages';
import { user } from './resolvers/queries/user';
import { users } from './resolvers/queries/users';
import { me } from './resolvers/queries/me';
import { messagesSubscription } from './resolvers/subscriptions/messagesSubscription';

export const resolvers: Resolvers = {
  Query: {
    users,
    user,
    messages,
    message,
    me,
  },
  User: UserModel,
  Message: MessageModel,
  Mutation: {
    createMessage,
    deleteMessage,
    updateMessage,
  },
  Subscription: {
    messages: messagesSubscription,
  },
};
