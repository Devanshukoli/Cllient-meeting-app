import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const host = process.env.REDIS_HOST!;
const port = Number(process.env.REDIS_PORT);
const password = process.env.REDIS_PASSWORD!;

console.log('🔍 Debug Info:');
console.log('  Host:', host);
console.log('  Port:', port);
console.log('  Has password:', !!password);

const client = createClient({
  username: 'default',
  password,
  socket: {
    host,
    port,
    tls: false,
    connectTimeout: 10000,
  }
});

client.on('error', (err: any) => {
  console.error('❌ Error code:', err.code);
  console.error('❌ Error message:', err.message);
});

client.on('connect', () => console.log('✅ TCP connection established'));
client.on('ready', () => console.log('✅ Redis ready — AUTH succeeded'));

try {
  await client.connect();
  const pong = await client.ping();
  console.log('✅ PING response:', pong);
  await client.quit();
  process.exit(0);
} catch (err: any) {
  console.error('❌ Connect failed:', err.message);
  process.exit(1);
}