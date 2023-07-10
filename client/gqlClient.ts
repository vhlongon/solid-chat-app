import {
  createClient,
  cacheExchange,
  fetchExchange,
  subscriptionExchange,
} from '@urql/core';
import { createClient as createWSClient, SubscribePayload } from 'graphql-ws';

const wsClient = createWSClient({
  url: import.meta.env.VITE_GRAPHQL_ENDPOINT_WS,
});

export const client = createClient({
  url: import.meta.env.VITE_GRAPHQL_ENDPOINT,
  fetchOptions: () => {
    const authToken = sessionStorage.getItem('authToken');
    return {
      headers: {
        Authorization: authToken
          ? `Bearer ${sessionStorage.getItem('authToken')}`
          : '',
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
            const dispose = wsClient.subscribe(
              operation as SubscribePayload,
              sink
            );
            return {
              unsubscribe: dispose,
            };
          },
        };
      },
    }),
  ],
});
