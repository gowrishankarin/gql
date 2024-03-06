import { GraphQLError } from "graphql";

const AuthenticationError = (
  authErrMessage = "*** you must be logged in ***"
) => {
  return new GraphQLError(authErrMessage, {
    extensions: {
      code: "UNAUTHENTICATED",
      response: {
        status: 401,
        body: authErrMessage,
      },
    },
  });
};

const ForbiddenError = (errMessage) => {
  return new GraphQLError(errMessage, {
    extensions: {
      code: "FORBIDDEN",
      response: {
        status: 403,
        body: errMessage,
      },
    },
  });
};

export { AuthenticationError, ForbiddenError };
