import { resolvers } from './resolvers';
import { createSchema } from 'graphql-yoga';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const typeDefs = readFileSync(
  path.resolve(__dirname, '../schema.graphql'),
  'utf8'
);

export const schema = createSchema({
  typeDefs,
  resolvers,
});
