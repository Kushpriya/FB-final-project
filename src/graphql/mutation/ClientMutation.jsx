import { gql } from "@apollo/client";

export const CREATE_CLIENT = gql`
 mutation CreateClient($input: CreateClientInput!) {
    createClient(input: $input) {
      client {
        id
        name
        address
        createdAt
        email
        phone
        updatedAt
      }
      clientMutationId
      errors
    }
  }
`;

export const EDIT_CLIENT = gql`
mutation EditClient($clientId: ID!, $clientInfo: ClientInput!) {
    editClient(input: { clientId: $clientId, clientInfo: $clientInfo }) {
        errors
        client {
            id
            name
            address
            createdAt
            email
            phone
            updatedAt
        }
        clientMutationId
    }
}
`;


export const DELETE_CLIENT = gql`
 mutation DeleteClient($clientId: ID!, $clientMutationId: String!) {
    deleteClient(input: { clientId: $clientId, clientMutationId: $clientMutationId }) {
      message
      errors
      clientMutationId
    }
  }
`;

