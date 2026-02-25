export const bookingLinkTypeDefs = `#graphql
  type BookingLink {
    id: String!
    userId: String!
    token: String!
    url: String!
    createdAt: String!
  }

  type TimeSlot {
    start: String!
    end: String!
  }

  type PublicBookingLink {
    id: String!
    token: String!
    user: User!
    createdAt: String!
  }

  type User {
    id: String!
    name: String
    email: String!
    timezone: String!
  }

  extend type Query {
    getBookingLink(token: String!): PublicBookingLink!
    getAvailableDates(token: String!): [String!]!
    getTimeSlots(token: String!, date: String!): [TimeSlot!]!
  }

  extend type Mutation {
    generateBookingLink: BookingLink!
  }
`;
