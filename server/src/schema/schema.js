const { projects, clients } = require("../../sampleData.js");

import Project from "../models/Project";
import Client from "../models/Client";
const authenticateGoogle = require("../auth/google.auth.js");
const getGoogleProfile = require("../auth/google.profile.js");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
} = require("graphql");

// Auth Response type
const AuthTokensType = new GraphQLObjectType({
  name: "AuthTokens",
  fields: () => ({
    accessToken: { type: GraphQLString },
    refreshToken: { type: GraphQLString },
  }),
});

// User Type
const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  }),
});

// Client type
const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

// Project type
const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parent, args) {
        return Client.findById(parent.clientId);
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return Project.find();
      },
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Project.findById(args.id);
      },
    },
    clients: {
      type: new GraphQLList(ClientType),
      resolve(parent, args) {
        return Client.find();
      },
    },
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return clients.findById(parent.clientId);
      },
    },
  },
});

// Mutations
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    signUpGoogle: {
      type: AuthTokensType,
      args: {
        accessToken: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(_, args, ctx) {
        var req = new Request(
          "",
          (options = {
            method: ctx.method,
            headers: ctx.headers,
            body: { access_token: args.accessToken },
          })
        );

        // const { models, req, res } = ctx;
        // // const { User } = models;

        // let newReq = { body: null, next: (response) => {
        //   console.log({response})
        // }}
        // if(req) {
        //   newReq.body = {
        //     ...req.body,
        //     access_token: args.accessToken,
        //   };
        // } else {
        //   newReq.body = {
        //     access_token: args.accessToken,
        //     refresh_token: ''
        //   }
        // }

        try {
          const { data, info } = await authenticateGoogle(newReq, res);
          // .then(res => {
          //   console.log({res})
          // }).catch(err => {
          //   console.log({err});
          // });
          const profile = await getGoogleProfile(args.accessToken);

          console.log({ profile, data, info });

          if (info) {
            switch (info.code) {
              case "ETIMEOUT":
                throw new Error("Failed to reach Google: Try again");
              default:
                throw new Error("Something went wrong");
            }
          }

          const { _json } = data.profile;
          const { email } = _json;
          const firstName = _json.given_name;
          const lastName = _json.family_name;

          let accessToken = "";
          let refreshToken = "";
          let message = "";

          const userExist = await User.findOne({
            where: {
              email: email.toLowerCase().replace(/ /gi, ""),
            },
          });

          if (!userExist) {
            const newUser = await User.create({
              email: email.toLowerCase().replace(/ /gi, ""),
              firstName,
              lastName,
            });
            accessToken = await generateToken(newUser.dataValues.id);
            refreshToken = await generateToken(newUser.dataValues.id, true);

            return {
              message,
              accessToken: `Bearer ${accessToken}`,
              refreshToken: `Bearer ${refreshToken}`,
            };
          }
          accessToken = await generateToken(newUser.dataValues.id);
          refreshToken = await generateToken(newUser.dataValues.id, true);

          return {
            message,
            accessToken: `Bearer ${accessToken}`,
            refreshToken: `Bearer ${refreshToken}`,
          };
        } catch (error) {
          console.log(error);
          return error;
        }
      },
    },
    // Add a client
    addClient: {
      type: ClientType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const client = new Client({
          name: args.name,
          email: args.email,
          phone: args.phone,
        });

        return client.save();
      },
    },

    // Delete a client
    deleteClient: {
      type: ClientType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        Project.find({ clientId: args.id }).then((projects) => {
          projects.forEach((project) => {
            project.deleteOne();
          });
        });

        return Client.findByIdAndDelete(args.id);
      },
    },

    // Add a project
    addProject: {
      type: ProjectType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatus",
            values: {
              new: { value: "Not Started" },
              progress: { value: "In Progress" },
              completed: { value: "Completed" },
            },
          }),
          defaultValue: "Not Started",
        },
        clientId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const project = new Project({
          name: args.name,
          description: args.description,
          status: args.status,
          clientId: args.clientId,
        });

        return project.save();
      },
    },

    // Delete a project
    deleteProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Project.findByIdAndDelete(args.id);
      },
    },

    // Update project
    updateProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatusUpdate",
            values: {
              new: { value: "Not Started" },
              progress: { value: "In Progress" },
              completed: { value: "Completed" },
            },
          }),
        },
      },
      resolve(parent, args) {
        return Project.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              description: args.description,
              status: args.status,
            },
          },
          { new: true }
        );
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
