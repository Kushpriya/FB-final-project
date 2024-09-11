import { gql } from "@apollo/client";

export const GET_ALL_TRANSPORTS_QUERY = gql`
  query GetAllTransport {
    getAllTransport {
      id
      name
      status
      tenantId
      createdAt
      updatedAt
      vehicleType
    }
  }
`;

export const GET_TRANSPORTS_BY_VEHICLE_TYPE_QUERY = gql`
query GetAllTransportByVehicleType($vehicleType:Vehicle!) {
    getAllTransportByVehicleType(vehicleType: $vehicleType) {
        id
        name
        status
        tenantId
        createdAt
        updatedAt
        vehicleType
    }
}

`;
