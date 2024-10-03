
import { gql } from '@apollo/client';

export const GET_ALL_ORDER_GROUPS = gql`
query GetAllOrderGroups {
    getAllOrderGroups {
        createdAt
        updatedAt
        startOn
        status
        client {
            name
        }
        deliveryOrder {
            source
            vehicleType
            courier {
                email
                firstName
                lastName
                bio
            }
            lineItems {
                quantity
                unit
                merchandiseCategory {
                    description
                    name
                }
                merchandise {
                    description
                    status
                    name
                    createdAt
                    id
                    merchandiseCategory {
                        createdAt
                        description
                        id
                        name
                        tenantId
                        updatedAt
                    }
                    merchandiseCategoryId
                    price
                    unit
                    updatedAt
                }
                price
                createdAt
                deliveryOrderId
                id
                merchandiseCategoryId
                merchandiseId
                updatedAt
            }
            transport {
                name
                status
            }
            courierId
            createdAt
            id
            orderGroupId
            transportId
            updatedAt
        }
        venue {
            name
        }
        completedOn
        id
        recurring {
            endDate
            frequency
            startDate
        }
        mainOrderGroupId
        clientId
        tenantId
        venueId
    }
}
`;


export const GET_CHILDREN_RECURRING_ORDERS = gql`
query GetChildrenRecurringOrders($mainRecurringOrderId: ID!) {
    getChildrenRecurringOrders(mainRecurringOrderId: $mainRecurringOrderId) {
        clientId
        createdAt
        updatedAt
        completedOn
        id
        mainOrderGroupId
        startOn
        status
        tenantId
        venueId
        client {
            address
            email
            id
            name
            phone
        }
        deliveryOrder {
            courierId
            id
            orderGroupId
            source
            transportId
            vehicleType
            lineItems {
                deliveryOrderId
                merchandiseCategoryId
                merchandiseId
                price
                quantity
                unit
            }
        }
    }
}`;
