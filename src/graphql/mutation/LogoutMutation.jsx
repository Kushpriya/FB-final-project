import { gql } from '@apollo/client';

const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout(input: {}) {
      success
      message
    }
  }
`;

export default LOGOUT_MUTATION;