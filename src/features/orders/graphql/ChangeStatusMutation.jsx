import { gql } from "@apollo/client";

export const CHANGE_STATUS_TO_DELIVERED = gql`
mutation ChangeStatusToDelivered($orderGroupId: ID!) {
    changeStatusToDelivered(input: {
        orderGroupId: $orderGroupId
    }) {
        errors
        message
        orderGroup {
            clientId
            completedOn
            createdAt
            id
            mainOrderGroupId
            startOn
            status
            tenantId
            updatedAt
            venueId
            client {
                address
                createdAt
                email
                id
                name
                phone
                updatedAt
            }
            deliveryOrder {
                courierId
                createdAt
                id
                orderGroupId
                source
                transportId
                updatedAt
                vehicleType
                courier {
                    bio
                    createdAt
                    email
                    encryptedPassword
                    firstName
                    id
                    jti
                    lastName
                    rememberCreatedAt
                    resetPasswordSentAt
                    resetPasswordToken
                    tenantId
                    updatedAt
                }
                lineItems {
                    createdAt
                    deliveryOrderId
                    id
                    merchandiseCategoryId
                    merchandiseId
                    price
                    quantity
                    unit
                    updatedAt
                    merchandiseCategory {
                        createdAt
                        description
                        id
                        name
                        tenantId
                        updatedAt
                    }
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
                transport {
                    createdAt
                    id
                    name
                    status
                    tenantId
                    updatedAt
                    vehicleType
                }
            }
            recurring {
                endDate
                frequency
                startDate
            }
            venue {
                createdAt
                id
                name
                updatedAt
            }
        }
    }
}
`;

export const CHANGE_STATUS_TO_CANCELLED = gql`
mutation ChangeStatusToCancelled($orderGroupId: ID!) {
    changeStatusToCancelled(input: { orderGroupId: $orderGroupId }) {
        errors
        message
        orderGroup {
            clientId
            completedOn
            createdAt
            id
            mainOrderGroupId
            startOn
            status
            tenantId
            updatedAt
            venueId
            client {
                address
                createdAt
                email
                id
                name
                phone
                updatedAt
            }
            deliveryOrder {
                courierId
                createdAt
                id
                orderGroupId
                source
                transportId
                updatedAt
                vehicleType
                courier {
                    bio
                    createdAt
                    email
                    encryptedPassword
                    firstName
                    id
                    jti
                    lastName
                    rememberCreatedAt
                    resetPasswordSentAt
                    resetPasswordToken
                    tenantId
                    updatedAt
                }
                lineItems {
                    createdAt
                    deliveryOrderId
                    id
                    merchandiseCategoryId
                    merchandiseId
                    price
                    quantity
                    unit
                    updatedAt
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
                        merchandiseCategory {
                            createdAt
                            description
                            id
                            name
                            tenantId
                            updatedAt
                        }
                    }
                    merchandiseCategory {
                        createdAt
                        description
                        id
                        name
                        tenantId
                        updatedAt
                    }
                }
                transport {
                    createdAt
                    id
                    name
                    status
                    tenantId
                    updatedAt
                    vehicleType
                }
            }
            recurring {
                endDate
                frequency
                startDate
            }
            venue {
                createdAt
                id
                name
                updatedAt
            }
        }
    }
}
`;