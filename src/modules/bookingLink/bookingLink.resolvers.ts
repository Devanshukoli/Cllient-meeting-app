import { GraphQLError } from 'graphql';
import { Context } from '../../graphql/context.js';
import { BookingLinkService } from '../../services/bookingLink.service.js';

export const bookingLinkResolvers = {
  Mutation: {
    generateBookingLink: async (_: any, __: any, context: Context) => {
      // 1. Authentication Check
      if (!context.user) {
        throw new GraphQLError('Not authenticated', {
          extensions: { code: 'UNAUTHENTICATED' },
        });
      }

      try {
        // 2. Generate and Store Token
        const bookingLink = await BookingLinkService.createBookingLink(context.user.id);

        // 3. Return with URL
        return {
          ...bookingLink,
          url: BookingLinkService.formatBookingUrl(bookingLink.token),
          createdAt: bookingLink.createdAt.toISOString(),
        };
      } catch (error: any) {
        throw new GraphQLError('Failed to generate booking link', {
          extensions: { code: 'INTERNAL_SERVER_ERROR', message: error.message },
        });
      }
    },
  },
};
