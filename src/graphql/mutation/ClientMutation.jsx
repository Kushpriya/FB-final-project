import { gql } from "@apollo/client";

export const CREATE_CLIENT = gql`
mutation CreateClient($name:String!) {
    createClient(input: {
        name:$name
    }) {
        message
        client {
            id
            name
        }
    }
}

`;

export const UPDATE_CLIENT = gql`
mutation EditClient($clientId:ID!,$clientName:String!) {
    editClient(input: {
        clientId:$clientId
        clientName:$clientName
    }) {
        message
        client {
            id
            name
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

