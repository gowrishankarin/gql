import { gql } from '@apollo/client';

const DELETE_PROJECT = gql`
  mutation DeleteProject($id: ID!) {
    deleteProject(id: $id) {
      id, name, status, description, client
    }
  }
`;


const ADD_PROJECT = gql`
  mutation AddProject(
    $name: String!
    $status: ProjectStatus!
    $description: String!
    $clientId: ID!
  ) {
    addProject(
      name: $name
      status: $status
      description: $description
      client: $clientId
    ) {
      name,
      status,
      description,
      client {
        id
        name
        email
        phone
      }
    }
  }
`;

const UPDATE_PROJECT = gql`
  mutation UpdateProject(
    $id: ID!
    $status: ProjectStatusUpdate!
    $description: String!
    $clientId: ID!
  ) {
    updateProject(
      id: $id
      name: $name
      description: $description
      status: $status
    ) {
      id
      name
      description
      status
      client {
        id
        name
        email
        phone
      }
    }
  }
`;

export { ADD_PROJECT, DELETE_PROJECT, UPDATE_PROJECT };