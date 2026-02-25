import { prisma } from '../lib/database.js';
import { redis } from '../lib/redis.js';
import { GraphQLError } from 'graphql';

export class BookingService {
  /**
   * Fetches existing bookings for a booking link on a specific date.
   */
  static async getBookingsByDate(bookingLinkId: string, date: Date) {
    return prisma.booking.findMany({
      where: {
        bookingLinkId,
        date,
      },
      select: {
        startTime: true,
        endTime: true,
      },
    });
  }

  /**
   * Books a slot with concurrency control.
   */
  static async bookSlot(data: {
    token: string;
    date: Date;
    startTime: string;
    endTime: string;
    visitorName: string;
    visitorEmail: string;
  }) {
    const { token, date, startTime, endTime, visitorName, visitorEmail } = data;

    // 1. Validate token exists
    const bookingLink = await prisma.bookingLink.findUnique({
      where: { token },
    });

    if (!bookingLink) {
      throw new GraphQLError('Invalid booking token', {
        extensions: { code: 'NOT_FOUND' },
      });
    }

    // 2. Acquire Redis lock
    // key = booking:{token}:{date}:{startTime}
    // TTL = 5 seconds
    const lockKey = `booking:${token}:${date.toISOString().split('T')[0]}:${startTime}`;
    const acquired = await redis.set(lockKey, 'locked', 'EX', 5, 'NX');

    if (!acquired) {
      throw new GraphQLError('This slot is currently being booked by someone else. Please try again in 5 seconds.', {
        extensions: { code: 'CONFLICT' },
      });
    }

    try {
      // 3. Start Prisma transaction
      return await prisma.$transaction(async (tx) => {
        // 4. Check if overlapping booking exists
        const overlapping = await tx.booking.findFirst({
          where: {
            bookingLinkId: bookingLink.id,
            date,
            OR: [
              {
                AND: [{ startTime: { lte: startTime } }, { endTime: { gt: startTime } }],
              },
              {
                AND: [{ startTime: { lt: endTime } }, { endTime: { gte: endTime } }],
              },
              {
                AND: [{ startTime: { gte: startTime } }, { endTime: { lte: endTime } }],
              },
            ],
          },
        });

        if (overlapping) {
          throw new GraphQLError('This slot is already booked', {
            extensions: { code: 'BAD_USER_INPUT' },
          });
        }

        // 5. Insert booking
        const booking = await tx.booking.create({
          data: {
            bookingLinkId: bookingLink.id,
            date,
            startTime,
            endTime,
            visitorName,
            visitorEmail,
          },
        });

        return booking;
      });
    } finally {
      // 7. Release lock
      await redis.del(lockKey);
    }
  }
}
