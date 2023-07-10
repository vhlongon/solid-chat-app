import { Resolvers } from '../../../generated/resolvers-types';

export const AuthPayloadModel: Resolvers['AuthPayload'] = {
  token: (payload) => payload.token,
  user: (payload) => payload.user,
};
