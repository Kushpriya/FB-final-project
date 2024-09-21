import { gql } from '@apollo/client';
export const GET_ALL_DELIVERY_ORDERS = gql`
query GetAllDeliveryOrders {
    getAllDeliveryOrders {
        id
        orderGroupId
        source
        vehicleType
        courier {
            email
            firstName
            lastName
        }
        transport {
            name
            status
        }
    }
}
`;