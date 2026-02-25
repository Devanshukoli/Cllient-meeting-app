import { gql } from 'graphql-request';
import { graphqlClient } from './client';

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
        name
      }
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation Register($email: String!, $password: String!, $name: String) {
    register(email: $email, password: $password, name: $name) {
      token
      user {
        id
        email
        name
      }
    }
  }
`;

export const authApi = {
  login: (variables: any) => graphqlClient.request(LOGIN_MUTATION, variables),
  register: (variables: any) => graphqlClient.request(REGISTER_MUTATION, variables),
};
