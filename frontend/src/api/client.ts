import { GraphQLClient } from 'graphql-request';

const GQL_ENDPOINT = 'http://localhost:4000/graphql';

export const graphqlClient = new GraphQLClient(GQL_ENDPOINT, {
  headers: () => {
    const token = localStorage.getItem('token');
    return {
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    };
  },
});
