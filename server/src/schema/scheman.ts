import { gql } from "graphql-tag";
// import { ProjectType } from "./schema";

export const typeDefs = gql`
  type Query {
    project(id: ID!): Project
    projects: [Project!]!
    client(id: ID!): Client
    clients: [Client!]!
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
`
