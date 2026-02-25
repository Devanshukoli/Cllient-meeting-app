export const bookingLinkTypeDefs = `#graphql
  type BookingLink {
    id: String!
    userId: String!
    token: String!
    url: String!
    createdAt: String!
  }

  extend type Mutation {
    generateBookingLink: BookingLink!
  }
`;
