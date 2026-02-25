import { z } from 'zod';

export const createAvailabilitySchema = z.object({
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  startTime: z.string().regex(/^([01]\d|2[0-3]):?([0-5]\d)$/, {
    message: "Invalid start time format (HH:mm)",
  }),
  endTime: z.string().regex(/^([01]\d|2[0-3]):?([0-5]\d)$/, {
    message: "Invalid end time format (HH:mm)",
  }),
});

export const availabilityTypeDefs = `#graphql
  type Availability {
    id: String!
    userId: String!
    date: String!
    startTime: String!
    endTime: String!
    createdAt: String!
  }

  extend type Mutation {
    createAvailability(date: String!, startTime: String!, endTime: String!): Availability!
  }
`;
