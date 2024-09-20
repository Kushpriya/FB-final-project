
import { gql } from '@apollo/client';

export const GET_ALL_ORDER_GROUPS = gql`
  query GetAllOrderGroups {
    getAllOrderGroups {
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
          }
          price
        }
        transport {
          name
          status
        }
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
    }
  }
`;


