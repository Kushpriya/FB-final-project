
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


export const GET_RECURRING_ORDERS = gql`
  query GetRecurringOrders {
    getRecurringOrders {
      id
      mainOrderGroupId
      startOn
      status
      tenantId
      venueId
      client {
        name
      }
      deliveryOrder {
        courierId
        source
        lineItems {
          deliveryOrderId
          price
          quantity
          unit
          merchandise {
            name
            status
            merchandiseCategory {
              name
            }
          }
        }
        orderGroupId
        vehicleType
      }
    }
  }
`;

export const GET_NON_RECURRING_ORDERS = gql`
  query GetNonRecurringOrders {
    getNonRecurringOrders {
      client{
        name
        email
      }
      clientId
      completedOn
      id
      mainOrderGroupId
      startOn
      status
      tenantId
      venueId
      venue{
        name
      }
      deliveryOrder {
        courier{
          firstName
          lastName
          email
        }
        courierId
        id
        orderGroupId
        source
        transportId
        vehicleType
        lineItems {
          deliveryOrderId
          id
          merchandiseCategoryId
          merchandiseId
          price
          quantity
          unit
        }
      }
    }
  }
`;


export const GET_MAIN_RECURRING_ORDERS = gql`
query GetMainRecurringOrders {
  getMainRecurringOrders {
      createdAt
      updatedAt
      clientId
      completedOn
      id
      mainOrderGroupId
      startOn
      status
      tenantId
      venueId
      deliveryOrder {
          courierId
          id
          orderGroupId
          source
          transportId
          vehicleType
          lineItems {
              deliveryOrderId
              id
              merchandiseCategoryId
              merchandiseId
              price
              quantity
              unit
          }
      }
      recurring {
          endDate
          frequency
          startDate
      }
  }
}`;

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
