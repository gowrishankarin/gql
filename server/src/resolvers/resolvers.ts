

export const resolvers = {
  Query: {
    projects: async (_: any, __: any, { dataSources }: any) => {
      let projects = await dataSources.projectAPI.findAll();
      return projects;
    },
    project: (_: any, { id }: any,  { dataSources }: any) => {
      return dataSources.projectAPI.getProject(id);
    }
  },
  Project: {
    id: async (parent: any) => {
      return parent._id;
    }
    // client: (parent: any, args: any, { dataSources }: any) => {
    //   return {};
    // }
  }
}

