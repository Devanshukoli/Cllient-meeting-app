import { prisma } from '../lib/database.js';

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
}
