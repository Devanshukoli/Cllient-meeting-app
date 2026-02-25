import { gql } from 'graphql-request';
import { graphqlClient } from './client';

export const CREATE_AVAILABILITY_MUTATION = gql`
  mutation CreateAvailability($date: String!, $startTime: String!, $endTime: String!) {
    createAvailability(date: $date, startTime: $startTime, endTime: $endTime) {
      id
      date
      startTime
      endTime
    }
  }
`;

export const availabilityApi = {
  create: (variables: { date: string; startTime: string; endTime: string }) =>
    graphqlClient.request(CREATE_AVAILABILITY_MUTATION, variables),
};
