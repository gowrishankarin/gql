import colors from 'colors';
import dotenv from 'dotenv';
dotenv.config();  // Load environment variables from .env file
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import express from "express";
import http from "http";

import { typeDefs } from "./schema/scheman";
import { resolvers } from "./resolvers/resolvers";
import { mongoConnect } from "./config/db";
const PORT = process.env.PORT || 5000;

import ProjectAPI from "./datasources/project.api";
import ClientAPI from "./datasources/client.api";
import UserAPI from "./datasources/user.api";
import app from "./app";

async function startApolloServer() {
  const client = await mongoConnect();
  const httpServer = http.createServer(app);

  const context = async ({
    req,
    res,
  }: {
    req: express.Request;
    res: express.Response;
  }) => {
    const token = req.headers.authorization || "";
    const userId = token.split(" ")[1];
    let userInfo = {};

    if (userId) {
      userInfo = { userId: "Shankar", userRole: "Host" };
    }
    // const { cache } = this;
    return {
      ...userInfo,
      req: req,
      res: res,
      dataSources: {
        userAPI: new UserAPI({
          modelOrCollection: client.db().collection("users"),
          // cache,
        }),
        projectAPI: new ProjectAPI({
          modelOrCollection: client.db().collection("projects"),
          // cache,
        }),
        clientAPI: new ClientAPI({
          modelOrCollection: client.db().collection("clients"),
          // cache,
        }),
      },
    };
  };

  const server = await new ApolloServer({
    typeDefs,
    resolvers,
    context,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  server.applyMiddleware({ app });
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: PORT }, () => {
      resolve();
    })
  );

  console.log(`
    🚀  Server is running!
    📭  Query at ${url}
  `);

  return { server, url };
}

const { server, url } = startApolloServer();
