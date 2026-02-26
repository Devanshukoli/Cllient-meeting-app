import { Redis } from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
const isCloudRedis = redisUrl.includes('redislabs.com') || redisUrl.includes('redis.cloud') || redisUrl.includes('upstash.io');

export const redis = new Redis(redisUrl, {
  maxRetriesPerRequest: null,
  connectTimeout: 10000,
  ...(isCloudRedis && { tls: {} }), // Essential for cloud redis
  retryStrategy(times) {
    if (times > 5) {
      console.error('❌ Redis: Max retries reached, stopping reconnection');
      return null;
    }
    const delay = Math.min(times * 500, 3000);
    console.log(`🔄 Redis: Reconnecting in ${delay}ms (attempt ${times})`);
    return delay;
  },
});

redis.on('connect', () => {
  console.log('✅ Redis connected');
});

redis.on('ready', () => {
  console.log('✅ Redis ready');
});

redis.on('error', (error: Error) => {
  console.error('❌ Redis error:', error.message);
});

export default redis;