import { prisma } from '../lib/database.js';
import crypto from 'crypto';

export class BookingLinkService {
  /**
   * Generates a random 32-character secure token.
   */
  static generateToken(): string {
    return crypto.randomBytes(16).toString('hex');
  }

  /**
   * Creates a new booking link for a user.
   */
  static async createBookingLink(userId: string) {
    const token = this.generateToken();

    return prisma.bookingLink.create({
      data: {
        userId,
        token,
      },
    });
  }

  /**
   * Formats the full booking URL.
   */
  static formatBookingUrl(token: string): string {
    const baseUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    return `${baseUrl}/book/${token}`;
  }

  /**
   * Fetches a booking link by its token.
   */
  static async getBookingLinkByToken(token: string) {
    return prisma.bookingLink.findUnique({
      where: { token },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            timezone: true,
          },
        },
      },
    });
  }
}
