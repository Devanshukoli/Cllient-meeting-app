import { prisma } from '../lib/database.js';

export class AvailabilityService {
  static async createAvailability(data: {
    userId: string;
    date: Date;
    startTime: string;
    endTime: string;
  }) {
    return prisma.availability.create({
      data: {
        userId: data.userId,
        date: data.date,
        startTime: data.startTime,
        endTime: data.endTime,
      },
    });
  }

  /**
   * Fetches all unique availability dates from today onwards for a user.
   */
  static async getFutureAvailableDates(userId: string) {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const availability = await prisma.availability.findMany({
      where: {
        userId,
        date: {
          gte: today,
        },
      },
      select: {
        date: true,
      },
      orderBy: {
        date: 'asc',
      },
    });

    // Extract unique dates as ISO strings (YYYY-MM-DD)
    const uniqueDates = Array.from(
      new Set(availability.map((a) => a.date.toISOString().split('T')[0]))
    );

    return uniqueDates;
  }

  /**
   * Fetches availability for a specific date and user.
   */
  static async getAvailabilityByDate(userId: string, date: Date) {
    return prisma.availability.findFirst({
      where: {
        userId,
        date,
      },
    });
  }
}
