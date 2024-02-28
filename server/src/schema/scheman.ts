import { gql } from "graphql-tag";
// import { ProjectType } from "./schema";

export const typeDefs = gql`
  type Query {
    project(id: ID!): Project
    projects: [Project!]!
  }

  type Project {
    _id: ID!
    name: String!
    description: String!
    status: String!
    clientId: ID!
  }

  type Client {
    id: ID!
    name: String!
    email: String!
    phone: String!
  }
`
