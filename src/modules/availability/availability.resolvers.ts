import { GraphQLError } from 'graphql';
import { Context } from '../../graphql/context.js';
import { createAvailabilitySchema } from './availability.schema.js';
import { AvailabilityService } from '../../services/availability.service.js';

export const availabilityResolvers = {
  Mutation: {
    createAvailability: async (_: any, args: any, context: Context) => {
      // 1. Authentication Check
      if (!context.user) {
        throw new GraphQLError('Not authenticated', {
          extensions: { code: 'UNAUTHENTICATED' },
        });
      }

      // 2. Input Validation
      const validation = createAvailabilitySchema.safeParse(args);
      if (!validation.success) {
        throw new GraphQLError('Invalid input', {
          extensions: {
            code: 'BAD_USER_INPUT',
            errors: validation.error.flatten().fieldErrors,
          },
        });
      }

      const { date, startTime, endTime } = validation.data;

      // 3. Logic Validation
      // startTime < endTime
      if (startTime >= endTime) {
        throw new GraphQLError('Start time must be before end time', {
          extensions: { code: 'BAD_USER_INPUT' },
        });
      }

      // Date must not be in the past
      const inputDate = new Date(date);
      const now = new Date();
      // Set both to midnight for comparison
      const inputDateMidnight = new Date(Date.UTC(inputDate.getUTCFullYear(), inputDate.getUTCMonth(), inputDate.getUTCDate()));
      const nowMidnight = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));

      if (inputDateMidnight < nowMidnight) {
        throw new GraphQLError('Date cannot be in the past', {
          extensions: { code: 'BAD_USER_INPUT' },
        });
      }

      // 4. Store/Save
      try {
        const availability = await AvailabilityService.createAvailability({
          userId: context.user.id,
          date: inputDateMidnight,
          startTime,
          endTime,
        });

        return availability;
      } catch (error: any) {
        throw new GraphQLError('Failed to create availability', {
          extensions: { code: 'INTERNAL_SERVER_ERROR', message: error.message },
        });
      }
    },
  },
};
