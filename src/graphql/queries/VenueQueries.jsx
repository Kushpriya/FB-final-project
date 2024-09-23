import { gql } from '@apollo/client';

export const GET_VENUES_BY_CLIENT_ID = gql`
query GetVenuesByClientId($clientId: ID!) {
    getVenuesByClientId(clientId: $clientId) {
        createdAt
        id
        name
        updatedAt
    }
}
`;
