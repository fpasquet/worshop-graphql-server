import 'reflect-metadata';
import * as express from 'express';
import * as http from 'http';
import { ApolloServer } from 'apollo-server-express';
import { express as voyagerMiddleware } from 'graphql-voyager/middleware';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';

import * as typeOrmConfig from './config/typeorm.config';
import { GraphqlContext, initRepositories } from './config/graphql-context';
import { getServerInfo } from './services/server-info.service';

import { SampleResolver } from './resolvers/sample.resolver';
import { BookResolver } from './resolvers/book.resolver';
import { CategoryResolver } from './resolvers/category.resolver';
import { PersonResolver } from './resolvers/person.resolver';
import { NotificationResolver } from './resolvers/notification.resolver';

const bootstrap = async (): Promise<void> => {
  try {
    const connectionDatabase = await createConnection(typeOrmConfig);

    const schema = await buildSchema({
      resolvers: [SampleResolver, CategoryResolver, BookResolver, PersonResolver, NotificationResolver],
    });

    const server = new ApolloServer({
      schema,
      playground: true,
      context: (): GraphqlContext => ({
        repositories: initRepositories(connectionDatabase),
      }),
    });

    const app = express();
    app.use('/graphql-voyager', voyagerMiddleware({ endpointUrl: '/graphql' }));
    server.applyMiddleware({ app });

    const httpServer = http.createServer(app);
    server.installSubscriptionHandlers(httpServer);

    httpServer.listen(process.env.PORT || 3000, () => {
      const serverInfo = getServerInfo(httpServer);
      console.log(`🚀  Server ready at ${serverInfo.url}${server.graphqlPath}`);
      console.log(`🚀 Subscriptions ready at ${serverInfo.url}${server.subscriptionsPath}`);
    });
  } catch (err) {
    console.error(err);
  }
};

bootstrap();
