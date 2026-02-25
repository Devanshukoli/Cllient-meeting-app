import { gql } from 'graphql-request';
import { graphqlClient } from './client';

export const GENERATE_BOOKING_LINK_MUTATION = gql`
  mutation GenerateBookingLink {
    generateBookingLink {
      token
      url
    }
  }
`;

export const bookingLinkApi = {
  generate: () => graphqlClient.request(GENERATE_BOOKING_LINK_MUTATION),
};
