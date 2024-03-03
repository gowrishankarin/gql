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
import { getContext } from "./context/context";
const PORT = process.env.PORT || 5000;

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
    return getContext(client, userInfo, req, res);
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
      console.log(`
    🚀  Server is running!
    📭  Query at ${url}
  `);
      resolve();
    })
  );

  return { server, url };
}

const { server, url } = startApolloServer();
