import ProjectAPI from "../datasources/project.api";
import ClientAPI from "../datasources/client.api";
import UserAPI from "../datasources/user.api";

export function getContext(client, userInfo, req, res) {
  // const { cache } = this;
  return {
    ...userInfo,
    req: req,
    res: res,
    dataSources: {
      userAPI: new UserAPI({
        modelOrCollection: client.db().collection("users"),
        // cache,
      }),
      projectAPI: new ProjectAPI({
        modelOrCollection: client.db().collection("projects"),
        // cache,
      }),
      clientAPI: new ClientAPI({
        modelOrCollection: client.db().collection("clients"),
        // cache,
      }),
    },
  };
}
