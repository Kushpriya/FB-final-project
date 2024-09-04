import { gql } from '@apollo/client';

const LOGIN_MUTATION = gql`
  mutation Login($loginData: UserLoginInput!) {
    login(input: { loginData: $loginData }) {
      token
      user {
        name
        email
        jti
      }
    }
  }
`;

export default LOGIN_MUTATION;
