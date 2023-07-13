import { createSchema } from 'graphql-yoga';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { resolvers } from './resolvers';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const typeDefs = readFileSync(path.resolve(__dirname, '../schema.graphql'), 'utf8');

export const schema = createSchema({
  typeDefs,
  resolvers,
});
