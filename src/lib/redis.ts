import { Redis } from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

export const redis = new Redis(redisUrl, {
  maxRetriesPerRequest: null,
});

redis.on('connect', () => {
  console.log('Successfully connected to Redis');
});

redis.on('error', (error: Error) => {
  console.error('Redis connection error:', error);
});
