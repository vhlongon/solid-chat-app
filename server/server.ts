import { createPubSub, createYoga } from 'graphql-yoga';
import { createServer } from 'node:http';
import { schema } from './schema';
import chalk from 'chalk';

export const pubSub = createPubSub();

const yoga = createYoga({
  schema,
  context: { pubSub },
});
const server = createServer(yoga);

server.listen(4000, () => {
  console.info(
    chalk.cyan.bold('Server is running on http://localhost:4000/graphql 🚀')
  );
});
