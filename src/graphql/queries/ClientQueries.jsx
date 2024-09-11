import { gql } from "@apollo/client";

export const GET_CLIENT_BY_ID = gql`
query GetClientById($clientId:ID!) {
    getClientById(clientId: $clientId) {
        createdAt
        id
        name
        updatedAt
    }
}
`;


export const GET_ALL_CLIENTS = gql`
query GetAllClients {
    getAllClients {
        id
        name
    }
}


`;
