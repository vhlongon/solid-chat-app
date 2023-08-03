import { cacheExchange, createClient, fetchExchange, subscriptionExchange } from '@urql/core';
import { SubscribePayload, createClient as createWSClient } from 'graphql-ws';
import { authToken } from './storage';

const wsClient = createWSClient({
  url: import.meta.env.VITE_GRAPHQL_ENDPOINT_WS,
});

export const client = createClient({
  url: import.meta.env.VITE_GRAPHQL_ENDPOINT,
  fetchOptions: () => {
    const token = authToken();
    return {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    };
  },
  exchanges: [
    cacheExchange,
    fetchExchange,
    subscriptionExchange({
      forwardSubscription(operation) {
        return {
          subscribe: (sink) => {
            const dispose = wsClient.subscribe(operation as SubscribePayload, sink);
            return {
              unsubscribe: dispose,
            };
          },
        };
      },
    }),
  ],
});
