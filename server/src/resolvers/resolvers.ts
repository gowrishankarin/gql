

export const resolvers = {
  Query: {
    project: (_, { id },  { dataSources }) => {
      return dataSources.projectAPI.getProject(id);
    }
  },
  Project: {
    client: (parent, args, { dataSources }) => {
      return {};
    }
  }
}

