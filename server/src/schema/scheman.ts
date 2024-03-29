import { gql } from "graphql-tag";
// import { ProjectType } from "./schema";

export const typeDefs = gql`
  type Query {
    project(id: ID!): Project
    projects: [Project!]!
    client(id: ID!): Client
    clients: [Client!]!
  }

  type Mutation {
    addProject(
      name: String!
      description: String!
      status: String!
      clientId: ID!
    ): ProjectResponse!

    updateProject(
      id: ID!
      name: String!
      description: String!
      status: String!
    ): ProjectResponse

    deleteProject(id: ID!): ProjectResponse

    addClient(name: String!, email: String!, phone: String!): ClientResponse
    updateClient(
      id: ID!
      name: String
      email: String
      phone: String
    ): ClientResponse
    deleteClient(id: ID!): ClientResponse

    signUpGoogle(accessToken: String!): AccessTokens!
  }

  type Project {
    id: ID!
    name: String!
    description: String!
    status: String!
    client: Client
  }

  type ProjectResponse {
    code: Int!
    success: Boolean!
    message: String!
    project: Project
  }

  type Client {
    id: ID!
    name: String!
    email: String!
    phone: String!
  }

  type ClientResponse {
    code: Int!
    success: Boolean!
    message: String!
    client: Client
  }

  type AccessTokens {
    accessToken: String!
    displayName: String!
    pictureUrl: String!
    message: String!
  }
`;
