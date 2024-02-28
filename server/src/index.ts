import colors from 'colors';
import dotenv from 'dotenv';
dotenv.config();  // Load environment variables from .env file
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { typeDefs } from "./schema/scheman";
import { resolvers } from "./resolvers/resolvers";
import { mongoConnect } from "./config/db";
const PORT = process.env.PORT || 5000;

import ProjectAPI from "./datasources/project.api";
import ClientAPI from "./datasources/client.api";

async function startApolloServer() {
  const client = await mongoConnect();
  const server = await new ApolloServer({
    typeDefs,
    resolvers,

  });

  const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => {
      const token = req.headers.authorization || "";
      const userId = token.split(" ")[1];
      let userInfo = {};
      if (userId) {
        userInfo = { userId: "Shankar", userRole: "Host" };
      }
      const { cache } = server;
      return {
        ...userInfo,
        dataSources: {
          projectAPI: new ProjectAPI({
            modelOrCollection: client.db().collection('projects'),
          }),
          clientAPI: new ClientAPI({
            modelOrCollection: client.db().collection('clients'),
          }),
        },
      };
    },
  });
  console.log(`
    🚀  Server is running!
    📭  Query at ${url}
  `);
}

startApolloServer();
