import { gql } from "@apollo/client";

export const CREATE_TRANSPORT = gql`
  mutation CreateTransport($transportInfo: MakeTransportInput!) {
    createTransport(input: { transportInfo: $transportInfo }) {
      transport {
        id
        name
        status
        tenantId
        createdAt
        updatedAt
      }
      errors
      message
    }
  }
`;

export const UPDATE_TRANSPORT = gql`
mutation UpdateTransport($transportId:ID!, $transportInfo:MakeTransportInput!) {
    updateTransport(input: {
        transportId:$transportId,
        transportInfo:$transportInfo
    }) {
        errors
        message
        transport {
            id
            name
            status
            tenantId
            updatedAt
            vehicleType
            createdAt
        }
    }
}

`;


export const DELETE_TRANSPORT = gql`
mutation DeleteTransport($transportId:ID!) {
    deleteTransport(input: {
        transportId: $transportId
    }) {
        errors
        message
    }
}
`;

