import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import http from 'http';
import app from './app.js';
import { createContext, Context } from './graphql/context.js';
import { BaseContext } from '@apollo/server';

import { authTypeDefs } from './modules/auth/auth.schema.js';
import { authResolvers } from './modules/auth/auth.resolvers.js';

const httpServer = http.createServer(app);

const server = new ApolloServer<Context>({
  typeDefs: [authTypeDefs],
  resolvers: [authResolvers],
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

async function startServer() {
  await server.start();

  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: createContext,
    })
  );

  const PORT = process.env.PORT || 4000;

  await new Promise<void>((resolve) => httpServer.listen({ port: Number(PORT) }, resolve));
  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
}

startServer().catch((error) => {
  console.error('Failed to start server:', error);
});
