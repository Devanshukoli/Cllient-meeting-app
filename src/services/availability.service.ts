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
}
