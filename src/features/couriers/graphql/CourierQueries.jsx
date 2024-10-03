import { gql } from '@apollo/client';

export const GET_ALL_COURIER= gql`
query GetAllCourier {
    getAllCourier {
        bio
        email
        firstName
        id
        lastName
        tenantId
    }
}`;