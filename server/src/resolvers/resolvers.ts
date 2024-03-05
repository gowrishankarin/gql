import jwt, { SignOptions } from "jsonwebtoken";
import { AuthenticationError, ForbiddenError } from "../errors/auth.errors";

export const resolvers = {
  Query: {
    projects: async (_: any, __: any, { dataSources }: any) => {
      let projects = await dataSources.projectAPI.findAll();
      return projects;
    },
    project: (_: any, { id }: any, { dataSources }: any) => {
      return dataSources.projectAPI.getProject(id);
    },
    clients: async (_: any, __: any, { dataSources }: any) => {
      let clients = await dataSources.clientAPI.findAll();
      return clients;
    },
    client: (_: any, { id }: any, { dataSources }: any) => {
      return dataSources.clientAPI.getClient(id);
    },
  },
  Mutation: {
    signUpGoogle: async (
      _: any,
      { accessToken }: any,
      { dataSources, req, res }: any
    ) => {
      const user = await dataSources.userAPI.maybeSignUpGoogle(
        accessToken,
        req,
        res
      );

      console.log({ user });

      // TODO: Move this to utils.
      const token = jwt.sign(user, process.env.JWT_SECRET, {
        algorithm: "HS256",
        subject: user._id.toString(),
        expiresIn: "2 days",
      } as SignOptions);

      return {
        displayName: user.displayName,
        pictureUrl: user.picture,
        message: "Authenticated",
        accessToken: token,
      };
    },
    addProject: async (
      _: any,
      { name, description, status, clientId }: any,
      { dataSources, currentUser }: any
    ) => {
      try {
        if (!currentUser) {
          throw AuthenticationError(
            "You are not authenticated to perform this action."
          );
        }

        const createResult = await dataSources.projectAPI.create({
          name,
          description,
          status,
          clientId,
        });

        const project = await dataSources.projectAPI.getProject(
          createResult.insertedId
        );
        return {
          code: 200,
          success: true,
          message: `Successfully created the project ${project.id}`,
          project,
        };
      } catch (err) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          track: null,
        };
      }
    },
    updateProject: async (
      _: any,
      { id, name, description, status }: any,
      { dataSources, currentUser }: any
    ) => {
      const updateResult = await dataSources.projectAPI.update({
        id,
        name,
        description,
        status,
      });
      console.log({ updateResult });
      const project = await dataSources.projectAPI.getProject(id);
      return project;
    },
    deleteProject: async (
      _: any,
      { id }: any,
      { dataSources, currentUser }: any
    ) => {
      const deletedProject = await dataSources.projectAPI.getProject(id);
      const deleteResult = await dataSources.projectAPI.delete(id);
      return deletedProject;
    },
    addClient: async (
      _: any,
      { name, email, phone }: any,
      { dataSources, currentUser }: any
    ) => {
      const createResult = await dataSources.clientAPI.create({
        name,
        email,
        phone,
      });

      const client = await dataSources.clientAPI.getClient(
        createResult.insertedId
      );

      return client;
    },
    updateClient: async (
      _: any,
      { id, name, email, phone }: any,
      { dataSources, currentUser }: any
    ) => {
      const updateResult = await dataSources.clientAPI.update({
        id,
        name,
        email,
        phone,
      });
      console.log({ updateResult });
      const client = await dataSources.clientAPI.getClient(id);
      return client;
    },
    deleteClient: async (
      _: any,
      { id }: any,
      { dataSources, currentUser }: any
    ) => {
      const client = await dataSources.clientAPI.getClient(id);
      const deleteResult = await dataSources.clientAPI.delete(id);
      return client;
    },
  },
  Project: {
    id: async (parent: any) => {
      return parent._id;
    },
    client: async (parent: any, args: any, { dataSources }: any) => {
      try {
        const client = await dataSources.clientAPI.getClient(parent.clientId);
        return client;
      } catch (error) {
        return error;
      }
    },
  },
  Client: {
    id: async (parent: any) => {
      return parent._id;
    },
  },
};
