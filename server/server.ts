import chalk from 'chalk';
import { useServer } from 'graphql-ws/lib/use/ws';
import { createPubSub, createYoga } from 'graphql-yoga';
import { createServer } from 'node:http';
import { Socket } from 'node:net';
import { WebSocketServer } from 'ws';
import { getTokenFromHeaders, getUserIdFromToken } from './auth';
import { schema } from './schema';

export const pubSub = createPubSub();

const yoga = createYoga({
  schema,
  context: (c) => {
    const auth = getTokenFromHeaders(c.request?.headers);

    if (!auth) {
      return { pubSub, userId: null };
    }

    return {
      pubSub,
      userId: getUserIdFromToken(auth),
    };
  },
});
const server = createServer(yoga);

const wss = new WebSocketServer({
  server,
  path: yoga.graphqlEndpoint,
});

useServer(
  {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    execute: (args: any) => args.execute(args),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    subscribe: (args: any) => args.subscribe(args),
    onSubscribe: async (ctx, msg) => {
      const { schema, execute, subscribe, contextFactory, parse, validate } =
        yoga.getEnveloped({
          ...ctx,
          req: ctx.extra.request,
          socket: ctx.extra.socket,
          params: msg.payload,
        });

      const args = {
        schema,
        operationName: msg.payload.operationName,
        document: parse(msg.payload.query),
        variableValues: msg.payload.variables,
        contextValue: await contextFactory(),
        execute,
        subscribe,
      };

      const errors = validate(args.schema, args.document);
      if (errors.length) return errors;
      return args;
    },
  },
  wss
);

const sockets = new Set<Socket>();
server.on('connection', (socket) => {
  sockets.add(socket);
  server.once('close', () => sockets.delete(socket));
});

const port = process.env.SERVER_PORT || 4000;

server.listen(port, () => {
  console.info(
    chalk.cyan.bold(`Server is running on http://localhost:${port}/graphql 🚀`)
  );
});
