import { gql } from '@apollo/client';

export const CREATE_VENUE = gql`
mutation CreateVenue($clientId:ID!,$name:String!) {
    createVenue(input: {
        clientId: $clientId
        name: $name
    }) {
        message
        venue {
            createdAt
            id
            name
            updatedAt
        }
    }
}

`;

export const EDIT_VENUE = gql`
mutation EditVenue($clientId:ID!, $venueId:ID!, $name:String!) {
    editVenue(input: {
        clientId:$clientId
        venueId:$venueId
        name:$name
    }) {
        message
        venue {
            createdAt
            id
            name
            updatedAt
        }
    }
}

`;

export const DELETE_VENUE = gql`
mutation DeleteVenue($clientId: ID!, $venueId: ID!) {
    deleteVenue(input: { clientId: $clientId, venueId: $venueId }) {
        message
        errors
    }
}

`;
