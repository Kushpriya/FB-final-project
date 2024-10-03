import { gql } from '@apollo/client';

export const GET_ALL_MERCHANDISE_CATEGORIES = gql`
query GetAllMerchandiseCategories {
    getAllMerchandiseCategories {
        description
        id
        name
        tenantId
    }
}

`;

export const GET_MERCHANDISE_CATEGORY_ID = gql`
query GetMerchandiseCategoryById($merchandiseCategoryId: ID!) {
    getMerchandiseCategoryById(merchandiseCategoryId: $merchandiseCategoryId) {
        createdAt
        description
        id
        name
        tenantId
        updatedAt
    }
}

`;