import { gql } from "@apollo/client";

export const CREATE_CLIENT = gql`
mutation CreateClient($clientInfo: ClientInput!) {
    createClient(input: { clientInfo: $clientInfo }) {
        errors
        client {
            address
            email
            id
            name
            phone
        }
    }
}

`;

export const EDIT_CLIENT = gql`
mutation EditClient($clientId: ID!, $clientInfo: ClientInput!) {
    editClient(input: { clientId: $clientId, clientInfo: $clientInfo }) {
        errors
        client {
            address
            createdAt
            email
            id
            name
            phone
            updatedAt
        }
    }
}

`;


export const DELETE_CLIENT = gql`
mutation DeleteClient($clientId:ID!) {
    deleteClient(input: {
        clientId:$clientId
    }) {
        message
    }
}

`;

