import { PrismaClient } from '@prisma/client';
import 'dotenv/config';

const p = new PrismaClient();

async function test() {
  const c = await p.user.count();
  console.log('DB OK, users:', c);
  await p.$disconnect();
}

test().catch(e => {
  console.error('DB FAIL:', e.message);
  process.exit(1);
});
