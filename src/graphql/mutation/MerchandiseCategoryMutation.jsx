import { gql } from '@apollo/client';

export const CREATE_CATEGORY = gql`
mutation CreateMerchandiseCategory($name: String!,$description:String!) {
    createMerchandiseCategory(
        input: {
            name:$name
            description:$description
        }
    ) {
        message
        merchandiseCategory {
            description
            id
            name
            tenantId
        }
    }
}

`;

export const EDIT_CATEGORY = gql`
mutation EditMerchandiseCategory($merchandiseCategoryId:ID!,$name:String!,$description:String!) {
    editMerchandiseCategory(
        input: {
            merchandiseCategoryId: $merchandiseCategoryId
            name: $name
            description: $description
        }
    ) {
        message
        merchandiseCategory {
            createdAt
            description
            id
            name
            tenantId
            updatedAt
        }
    }
}

`;

export const DELETE_CATEGORY = gql`
mutation DeleteMerchandiseCategory($merchandiseCategoryId:ID!) {
    deleteMerchandiseCategory(input: {
        merchandiseCategoryId:$merchandiseCategoryId
    }) {
        message
    }
}

`;
