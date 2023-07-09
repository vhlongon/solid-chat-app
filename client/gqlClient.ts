import { createClient, cacheExchange, fetchExchange } from '@urql/core';

export const client = createClient({
  url: 'http://localhost:4000/graphql',
  exchanges: [cacheExchange, fetchExchange],
});