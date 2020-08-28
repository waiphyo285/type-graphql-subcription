import { ApolloServer } from "apollo-server-express";
import Express from "express";
import * as http from "http";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { connect } from "mongoose";
import * as config from "./data/config.json";

// resolvers
import { ProductResolver } from "./resolvers/products";
import { CategoriesResolver } from "./resolvers/categories";
import { NotificationResolver } from "./resolvers/notifications";
import { LocationResolver } from "./resolvers/locations";


const PORT = config.port;
const DB = config.db;

const master = async () => {
  const schema = await buildSchema({
    resolvers: [ CategoriesResolver, ProductResolver, NotificationResolver, LocationResolver ],
    dateScalarMode: "isoDate",
    emitSchemaFile: true,
    validate: false,
  });

  // create mongoose connection
  const mongoose = await connect(`mongodb://localhost:27017/${DB}`, {useNewUrlParser: true});
  await mongoose.connection;

  // connect apollo connection 
  const server = new ApolloServer({ 
    schema,
    introspection: true,
    playground: true,
    subscriptions: {
      path: "/subscriptions"
    }
  }) as any;

  // express instance
  const app = Express();
  server.applyMiddleware({app});

  const httpServer = http.createServer(app);
  server.installSubscriptionHandlers(httpServer);

  // server listen on 
  httpServer.listen({ port: PORT }, () => {
    console.log(`> Server listen at http://localhost:${PORT}${server.graphqlPath}`);
    console.log(`> Subscription listen at ws://localhost:${PORT}${server.subscriptionsPath}`);
  });
};

master().catch((error)=>{
  console.log(error, 'error');
})