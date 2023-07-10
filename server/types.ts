import { createPubSub } from 'graphql-yoga';

export type PubSub = ReturnType<typeof createPubSub>;

export type JWTPayload = {
  userId: string;
};
export type Context = {
  pubSub: PubSub;
  userId: string | null;
};
