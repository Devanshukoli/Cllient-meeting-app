import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

export const redis = createClient({
  username: 'default',
  password: process.env.REDIS_PASSWORD!,
  socket: {
    host: process.env.REDIS_HOST!,
    port: Number(process.env.REDIS_PORT),
    tls: false,
  }
});

redis.on('error', (err) => console.error('❌ Redis error:', err.message));
redis.on('connect', () => console.log('✅ Redis connected'));
redis.on('ready', () => console.log('✅ Redis ready'));

await redis.connect();

export default redis;