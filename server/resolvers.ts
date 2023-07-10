import { Resolvers } from '../generated/resolvers-types';
import { AuthPayloadModel } from './resolvers/Models/AuthPayload';
import { MessageModel } from './resolvers/Models/MessageModel';
import { UserModel } from './resolvers/Models/UserModel';
import { authenticate } from './resolvers/mutations/authenticate';
import { verifyAuth } from './resolvers/mutations/verifyAuth';
import { createMessage } from './resolvers/mutations/createMessage';
import { deleteMessage } from './resolvers/mutations/deleteMessage';
import { updateMessage } from './resolvers/mutations/updateMessage';
import { authUrl } from './resolvers/queries/authUrl';
import { me } from './resolvers/queries/me';
import { message } from './resolvers/queries/message';
import { messages } from './resolvers/queries/messages';
import { user } from './resolvers/queries/user';
import { users } from './resolvers/queries/users';
import { messagesSubscription } from './resolvers/subscriptions/messagesSubscription';

export const resolvers: Resolvers = {
  Query: {
    users,
    user,
    messages,
    message,
    me,
    authUrl,
  },
  User: UserModel,
  Message: MessageModel,
  AuthPayload: AuthPayloadModel,
  Mutation: {
    createMessage,
    deleteMessage,
    updateMessage,
    authenticate,
    verifyAuth,
  },
  Subscription: {
    messages: messagesSubscription,
  },
};
