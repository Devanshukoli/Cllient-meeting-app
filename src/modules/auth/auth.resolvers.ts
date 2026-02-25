import { AuthService } from '../../services/auth.service.js';
import { registerSchema, loginSchema } from './auth.schema.js';
import { Context } from '../../graphql/context.js';
import { GraphQLError } from 'graphql';

export const authResolvers = {
  Query: {
    me: async (_: any, __: any, context: Context) => {
      if (!context.user) {
        throw new GraphQLError('Not authenticated', {
          extensions: { code: 'UNAUTHENTICATED' },
        });
      }

      const user = await context.prisma.user.findUnique({
        where: { id: context.user.id },
      });

      return user;
    },
  },
  Mutation: {
    register: async (_: any, args: any, context: Context) => {
      const validation = registerSchema.safeParse(args);
      if (!validation.success) {
        throw new GraphQLError('Invalid input', {
          extensions: {
            code: 'BAD_USER_INPUT',
            errors: validation.error.flatten().fieldErrors,
          },
        });
      }

      const { email, password, name } = validation.data;

      const existingUser = await context.prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        throw new GraphQLError('User already exists', {
          extensions: { code: 'CONFLICT' },
        });
      }

      const hashedPassword = await AuthService.hashPassword(password);
      const user = await context.prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
        },
      });

      const token = AuthService.generateToken(user);

      return {
        token,
        user,
      };
    },

    login: async (_: any, args: any, context: Context) => {
      const validation = loginSchema.safeParse(args);
      if (!validation.success) {
        throw new GraphQLError('Invalid input', {
          extensions: {
            code: 'BAD_USER_INPUT',
            errors: validation.error.flatten().fieldErrors,
          },
        });
      }

      const { email, password } = validation.data;

      const user = await context.prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new GraphQLError('Invalid credentials', {
          extensions: { code: 'UNAUTHENTICATED' },
        });
      }

      const isValid = await AuthService.comparePassword(password, user.password);
      if (!isValid) {
        throw new GraphQLError('Invalid credentials', {
          extensions: { code: 'UNAUTHENTICATED' },
        });
      }

      const token = AuthService.generateToken(user);

      return {
        token,
        user,
      };
    },
  },
};
