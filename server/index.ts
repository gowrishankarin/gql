import http from "http"
import colors from 'colors';
import dotenv from 'dotenv';
dotenv.config();  // Load environment variables from .env file
import { graphqlHTTP } from 'express-graphql';
import schema from './schema/schema';
import { mongoConnect } from "./config/db";
const PORT = process.env.PORT || 5000;
import passport from 'passport';

import app from "./app";

const server = http.createServer(app);

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: process.env.NODE_ENV === 'development'
}))

// app.use(passport.initialize());
// app.use(passport.session());

const startServer = async () => {
  await mongoConnect();
  // await loadPlanetsData();
  // await loadLaunchData();
  server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
  // httpsServer.listen(process.env.HTTPS_PORT, () => {
  //   console.log(`Secured Server is listening on port ${PORT + 1}`);
  // });
};
startServer();
