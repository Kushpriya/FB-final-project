import { gql } from '@apollo/client';

export const CREATE_ORDER_GROUP = gql`
  mutation CreateOrderGroup($orderGroupInfo: OrderGroupInput!) {
    createOrderGroup(input: {orderGroupInfo: $orderGroupInfo }) {
      errors
      orderGroup {
        startOn
        completedOn
        status
        clientId
        venueId
        mainOrderGroupId

        deliveryOrder {
          orderGroupId
          source
          courierId
          vehicleType
          transportId
          lineItems {
            deliveryOrderId
            quantity
            merchandiseCategoryId
            merchandiseId
            price
            quantity
            unit
            merchandise {
              name
              unit
              price
            }
            merchandiseCategory {
              id
              name
            }
          }
          courier {
            firstName
            lastName
          }
          transport {
            name
            vehicleType
          }
        }
        client {
          name
        }
        # completedOn
        # id
        venue {
          name
        }
      }
    }
  }
`;


export const EDIT_ORDER_GROUP = gql`
  mutation EditOrderGroup($orderGroupId: ID!, $orderGroupInfo: OrderGroupInput!) {
    editOrderGroup(input: { orderGroupId: $orderGroupId, orderGroupInfo: $orderGroupInfo }) {
      errors
      orderGroup {
        startOn
        status
        deliveryOrder {
          orderGroupId
          source
          lineItems {
            deliveryOrderId
            quantity
            merchandise {
              name
              unit
              price
            }
            merchandiseCategory {
              name
            }
          }
          courier {
            firstName
            lastName
          }
          transport {
            name
            vehicleType
          }
        }
        client {
          name
        }
        completedOn
        id
        venue {
          name
        }
      }
      message
    }
  }
`;

export const DELETE_ORDER_GROUP = gql`
  mutation DeleteOrderGroup($orderGroupId: ID!) {
    deleteOrderGroup(input: { orderGroupId: $orderGroupId }) {
      errors
      message
    }
  }
`;