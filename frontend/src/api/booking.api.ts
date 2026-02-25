import { gql } from 'graphql-request';
import { graphqlClient } from './client';

export const GET_BOOKING_LINK_QUERY = gql`
  query GetBookingLink($token: String!) {
    getBookingLink(token: $token) {
      id
      token
      user {
        id
        name
        email
      }
    }
  }
`;

export const GET_AVAILABLE_DATES_QUERY = gql`
  query GetAvailableDates($token: String!) {
    getAvailableDates(token: $token)
  }
`;

export const GET_TIME_SLOTS_QUERY = gql`
  query GetTimeSlots($token: String!, $date: String!) {
    getTimeSlots(token: $token, date: $date) {
      start
      end
    }
  }
`;

export const BOOK_SLOT_MUTATION = gql`
  mutation BookSlot(
    $token: String!
    $date: String!
    $startTime: String!
    $endTime: String!
    $visitorName: String!
    $visitorEmail: String!
  ) {
    bookSlot(
      token: $token
      date: $date
      startTime: $startTime
      endTime: $endTime
      visitorName: $visitorName
      visitorEmail: $visitorEmail
    ) {
      id
      date
      startTime
      endTime
      visitorName
    }
  }
`;

export const bookingApi = {
  getBookingLink: (token: string) => graphqlClient.request(GET_BOOKING_LINK_QUERY, { token }),
  getAvailableDates: (token: string) => graphqlClient.request(GET_AVAILABLE_DATES_QUERY, { token }),
  getTimeSlots: (token: string, date: string) => graphqlClient.request(GET_TIME_SLOTS_QUERY, { token, date }),
  bookSlot: (variables: {
    token: string;
    date: string;
    startTime: string;
    endTime: string;
    visitorName: string;
    visitorEmail: string;
  }) => graphqlClient.request(BOOK_SLOT_MUTATION, variables),
};
