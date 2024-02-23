const http = require("http");
const colors = require('colors');
require('dotenv').config();
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const { mongoConnect } = require("./config/db");
const PORT = process.env.PORT || 5000;
const passport = require('passport');

const app = require("./app");

const server = http.createServer(app);

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: process.env.NODE_ENV === 'development'
}))

app.use(passport.initialize());
app.use(passport.session());

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