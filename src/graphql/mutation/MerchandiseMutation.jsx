import { gql } from "@apollo/client";

 export const CREATE_MERCHANDISE = gql`
 mutation CreateMerchandise($merchandiseCategoryId:ID!,$merchandiseInfo:MakeMerchandiseInput!) {
    createMerchandise(
        input: {
            merchandiseCategoryId:$merchandiseCategoryId
            merchandiseInfo:$merchandiseInfo
        }
    ) {
        message
        merchandise {
            createdAt
            description
            id
            merchandiseCategoryId
            name
            price
            status
            unit
            updatedAt
        }
        errors
    }
}
 `;

 export const EDIT_MERCHANDISE = gql`
 mutation UpdateMerchandise($merchandiseInfo:MakeMerchandiseInput!,$merchandiseId:ID!) {
    updateMerchandise(
        input: {
            merchandiseInfo: $merchandiseInfo
            merchandiseId: $merchandiseId
        }
    ) {
        errors
        message
        merchandise {
            createdAt
            description
            id
            merchandiseCategoryId
            name
            price
            status
            unit
            updatedAt
        }
    }
}
`;

export const DELETE_MERCHANDISE = gql `
mutation DeleteMerchandise($merchandiseId:ID!) {
    deleteMerchandise(input: {
        merchandiseId: $merchandiseId
    }) {
        message
    }
}
`;