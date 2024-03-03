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
    ): Project!
    updateProject(
      id: ID!
      name: String!
      description: String!
      status: String!
    ): Project!
    deleteProject(id: ID!): Project!

    addClient(name: String!, email: String!, phone: String!): Client!
    updateClient(id: ID!, name: String, email: String, phone: String): Client!
    deleteClient(id: ID!): Client!
    signUpGoogle(accessToken: String!): AccessTokens!
  }

  type Project {
    id: ID!
    name: String!
    description: String!
    status: String!
    client: Client
  }

  type Client {
    id: ID!
    name: String!
    email: String!
    phone: String!
  }

  type AccessTokens {
    accessToken: String!
    refreshToken: String!
    message: String!
  }
`;
