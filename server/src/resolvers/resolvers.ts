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


        if (createResult.insertedId) {
          return {
            code: 200,
            success: true,
            message: `Successfully created the project ${project.id}`,
            project,
          };
        } else {
          return {
            code: 400,
            success: false,
            message: `Create project failed`,
            project: null,
          };
        }
      } catch (err) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          project: null,
        };
      }
    },
    updateProject: async (
      _: any,
      { id, name, description, status }: any,
      { dataSources, currentUser }: any
    ) => {

      try {
        if (!currentUser) {
          throw AuthenticationError(
            "You are not authenticated to perform this action."
          );
        }
        const updateResult = await dataSources.projectAPI.update({
          id,
          name,
          description,
          status,
        });
        console.log({ updateResult });
        const project = await dataSources.projectAPI.getProject(id);

        if (updateResult.modifiedCount === 1) {
          return {
            code: 200,
            success: true,
            message: `Successfully updated the project ${project.id}`,
            project,
          };
        } else {
          return {
            code: 400,
            success: false,
            message: `Update project failed ${project.id}`,
            project: null,
          };
        }
      } catch (err) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          project: null,
        };
      }
    },
    deleteProject: async (
      _: any,
      { id }: any,
      { dataSources, currentUser }: any
    ) => {
      try {
        if (!currentUser) {
          throw AuthenticationError(
            "You are not authenticated to perform this action."
          );
        }
        const deletedProject = await dataSources.projectAPI.getProject(id);
        const deleteResult = await dataSources.projectAPI.delete(id);

        if (deleteResult.deletedCount === 1) {
          return {
            code: 200,
            success: true,
            message: `Successfully deleted the project ${deletedProject.id}`,
            deletedProject,
          };
        } else {
          return {
            code: 400,
            success: false,
            message: `Delete project failed ${deletedProject.id}`,
            deletedProject,
          };
        }
      } catch (err) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          project: null,
        };
      }
    },
    addClient: async (
      _: any,
      { name, email, phone }: any,
      { dataSources, currentUser }: any
    ) => {

      try {
        if (!currentUser) {
          throw AuthenticationError(
            "You are not authenticated to perform this action."
          );
        }

        const createResult = await dataSources.clientAPI.create({
          name,
          email,
          phone,
        });

        const client = await dataSources.clientAPI.getClient(
          createResult.insertedId
        );

        console.log({ createResult });

        if (createResult.insertedId) {
          return {
            code: 200,
            success: true,
            message: `Successfully created the project ${client.id}`,
            client,
          };
        } else {
          return {
            code: 400,
            success: false,
            message: `Create project failed`,
            client: null,
          };
        }
      } catch (err) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          client: null,
        };
      }
    },
    updateClient: async (
      _: any,
      { id, name, email, phone }: any,
      { dataSources, currentUser }: any
    ) => {

      try {
        if (!currentUser) {
          throw AuthenticationError(
            "You are not authenticated to perform this action."
          );
        }
        const updateResult = await dataSources.clientAPI.update({
          id,
          name,
          email,
          phone,
        });
        console.log({ updateResult });
        const client = await dataSources.clientAPI.getClient(id);
        if (updateResult.modifiedCount === 1) {
          return {
            code: 200,
            success: true,
            message: `Successfully updated the client ${client.id}`,
            client,
          };
        } else {
          return {
            code: 400,
            success: false,
            message: `Update client failed ${client.id}`,
            client: null,
          };
        }
      } catch (err) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          client: null,
        };
      }
    },
    deleteClient: async (
      _: any,
      { id }: any,
      { dataSources, currentUser }: any
    ) => {
      try {
        if (!currentUser) {
          throw AuthenticationError(
            "You are not authenticated to perform this action."
          );
        }
        const client = await dataSources.clientAPI.getClient(id);
        const deleteResult = await dataSources.clientAPI.delete(id);
        console.log({ deleteResult });
        if (deleteResult.deletedCount === 1) {
          return {
            code: 200,
            success: true,
            message: `Successfully deleted the client ${client.id}`,
            client,
          };
        } else {
          return {
            code: 400,
            success: false,
            message: `Delete client failed ${client.id}`,
            client,
          };
        }
      } catch (err) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          client: null,
        };
      }
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
