import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const authTypeDefs = `#graphql
  type User {
    id: String!
    email: String!
    name: String
    timezone: String!
    createdAt: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Mutation {
    register(email: String!, password: String!, name: String): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
  }

  type Query {
    me: User
  }
`;
