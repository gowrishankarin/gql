import { gql } from '@apollo/client';

const DELETE_PROJECT = gql`
  mutation DeleteProject($id: ID!) {
    deleteProject(id: $id) {
      id, name, status, description, client {
        id, name
      }
    }
  }
`;


const ADD_PROJECT = gql`
  mutation AddProject(
    $name: String!
    $status: String!
    $description: String!
    $clientId: ID!
  ) {
    addProject(
      name: $name
      status: $status
      description: $description
      clientId: $clientId
    ) {
      name
      status
      description
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
    $name: String!
    $status: String!
    $description: String!
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
