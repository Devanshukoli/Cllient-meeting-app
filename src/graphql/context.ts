import { PrismaClient } from '@prisma/client';
import { prisma } from '../lib/database.js';
import { redis } from '../lib/redis.js';
import jwt from 'jsonwebtoken';
import { Request } from 'express';

export interface Context {
  prisma: PrismaClient;
  redis: any;
  user?: {
    id: string;
    email: string;
  };
}

export const createContext = async ({ req }: { req: Request }): Promise<Context> => {
  const token = req.headers.authorization?.split(' ')[1];
  let user = undefined;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as any;
      user = {
        id: decoded.userId,
        email: decoded.email,
      };
    } catch (error) {
      console.warn('Invalid token');
    }
  }

  return {
    prisma,
    redis,
    user,
  };
};
