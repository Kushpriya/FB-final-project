import { gql } from '@apollo/client';

export const GET_ALL_VENUES = gql`
  query GetAllVenues($clientId: ID!) {
    getVenuesByClientId(clientId: $clientId) {
      createdAt
      id
      name
      updatedAt
    }
  }
`;
