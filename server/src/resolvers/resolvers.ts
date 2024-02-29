

export const resolvers = {
  Query: {
    projects: async (_: any, __: any, { dataSources }: any) => {
      let projects = await dataSources.projectAPI.findAll();
      return projects;
    },
    project: (_: any, { id }: any,  { dataSources }: any) => {
      return dataSources.projectAPI.getProject(id);
    },
    clients: async (_: any, __: any, { dataSources }: any) => {
      let clients = await dataSources.clientAPI.findAll();
      return clients;
    },
    client: (_: any, { id }: any,  { dataSources }: any) => {
      return dataSources.clientAPI.getClient(id);
    },

  },
  Mutation: {
    addProject: async (
      _: any,
      {
        name, description, status, clientId
      }: any,
      { dataSources }: any
   ) => {
      const project = await dataSources.projectAPI.create({
        name, description, status, clientId
      });

      console.log({project})
      return project;
    },
    updateProject: async (
      _: any,
      {
        id, name, description, status, clientId
      }: any,
      { dataSources }: any
    ) => {
      const updateResult = await dataSources.projectAPI.update({
        id, name, description, status, clientId
      });
      console.log({updateResult})
      const project = await dataSources.projectAPI.getProject(id)
      return project;
    },
    deleteProject: async (_: any, { id }: any, { dataSources }: any) => {
      const deleteResult = await dataSources.projectAPI.delete(id);
      console.log({deleteResult})
      return { id };
    },
    addClient: async (_: any, __: any, { dataSources }: any) => {
    },
    updateClient: async (_: any, __: any, { dataSources }: any) => {
    },
    deleteClient: async (_: any, __: any, { dataSources }: any) => {
    }
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
    }
  },
  Client: {
    id: async (parent: any) => {
      return parent._id;
    },
  }
}

