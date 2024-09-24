import { gql } from "@apollo/client";

export const GET_ALL_MERCHANDISE_QUERY = gql`
  query GetAllMerchandises {
    getAllMerchandises {
        createdAt
        description
        id
        merchandiseCategoryId
        name
        price
        status
        unit
        updatedAt
        merchandiseCategory {
            name
        }
    }
}

`;

export const GET_MERCHANDISE_BY_CATEGORY_QUERY = gql`
query GetMerchandiseByCategory($merchandiseCategoryId: ID!) {
    getMerchandiseByCategory(merchandiseCategoryId: $merchandiseCategoryId) {
        createdAt
        description
        id
        merchandiseCategoryId
        name
        price
        status
        unit
        updatedAt
        merchandiseCategory {
            name
        }
    }
}
`;
