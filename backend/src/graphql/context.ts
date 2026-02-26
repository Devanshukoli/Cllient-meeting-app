import { PrismaClient } from '@prisma/client';
import { prisma } from '../lib/database.js';
import { redis } from '../lib/redis.js';
import { Request } from 'express';
import { AuthService } from '../services/auth.service.js';

export interface Context {
  prisma: PrismaClient;
  redis: any;
  user?: {
    id: string;
    email: string;
  };
}

export const createContext = async ({ req }: { req: Request }): Promise<Context> => {
  const authHeader = req.headers.authorization;
  let user: Context['user'] | undefined = undefined;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    const decoded = AuthService.verifyToken(token) as any;

    if (decoded) {
      user = {
        id: decoded.userId,
        email: decoded.email,
      };
    }
  }

  return {
    prisma,
    redis,
    user,
  };
};
