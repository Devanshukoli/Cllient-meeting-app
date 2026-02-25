import { GraphQLError } from 'graphql';
import { Context } from '../../graphql/context.js';
import { BookingLinkService } from '../../services/bookingLink.service.js';
import { AvailabilityService } from '../../services/availability.service.js';
import { BookingService } from '../../services/booking.service.js';
import { generateTimeSlots } from '../../utils/time.util.js';

export const bookingLinkResolvers = {
  Query: {
    getBookingLink: async (_: any, { token }: { token: string }) => {
      const bookingLink = await BookingLinkService.getBookingLinkByToken(token);

      if (!bookingLink) {
        throw new GraphQLError('Booking link not found', {
          extensions: { code: 'NOT_FOUND' },
        });
      }

      return {
        ...bookingLink,
        createdAt: bookingLink.createdAt.toISOString(),
      };
    },

    getAvailableDates: async (_: any, { token }: { token: string }) => {
      const bookingLink = await BookingLinkService.getBookingLinkByToken(token);

      if (!bookingLink) {
        throw new GraphQLError('Booking link not found', {
          extensions: { code: 'NOT_FOUND' },
        });
      }

      return AvailabilityService.getFutureAvailableDates(bookingLink.userId);
    },

    getTimeSlots: async (_: any, { token, date }: { token: string; date: string }) => {
      // 1. Validate Booking Link
      const bookingLink = await BookingLinkService.getBookingLinkByToken(token);
      if (!bookingLink) {
        throw new GraphQLError('Booking link not found', {
          extensions: { code: 'NOT_FOUND' },
        });
      }

      // 2. Fetch Availability for that date
      const selectedDate = new Date(date);
      selectedDate.setUTCHours(0, 0, 0, 0);

      const availability = await AvailabilityService.getAvailabilityByDate(
        bookingLink.userId,
        selectedDate
      );

      if (!availability) {
        return [];
      }

      // 3. Generate 30-minute slots
      const slots = generateTimeSlots(availability.startTime, availability.endTime, 30);

      // 4. Fetch existing bookings
      const existingBookings = await BookingService.getBookingsByDate(
        bookingLink.id,
        selectedDate
      );

      // 5. Filter out overlapping slots
      const availableSlots = slots.filter((slot) => {
        const isBooked = existingBookings.some((booking) => {
          // Normal collision detection: (start1 < end2) && (end1 > start2)
          return slot.start < booking.endTime && slot.end > booking.startTime;
        });
        return !isBooked;
      });

      return availableSlots;
    },
  },
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

    bookSlot: async (
      _: any,
      {
        token,
        date,
        startTime,
        endTime,
        visitorName,
        visitorEmail,
      }: {
        token: string;
        date: string;
        startTime: string;
        endTime: string;
        visitorName: string;
        visitorEmail: string;
      }
    ) => {
      try {
        const bookingDate = new Date(date);
        bookingDate.setUTCHours(0, 0, 0, 0);

        const booking = await BookingService.bookSlot({
          token,
          date: bookingDate,
          startTime,
          endTime,
          visitorName,
          visitorEmail,
        });

        return {
          ...booking,
          date: booking.date.toISOString(),
          createdAt: booking.createdAt.toISOString(),
        };
      } catch (error: any) {
        if (error instanceof GraphQLError) throw error;

        throw new GraphQLError('Failed to book slot', {
          extensions: { code: 'INTERNAL_SERVER_ERROR', message: error.message },
        });
      }
    },
  },
};
