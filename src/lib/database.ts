import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { createPool } from 'mariadb';
import dotenv from 'dotenv';

dotenv.config();

declare global {
  var prisma: PrismaClient | undefined;
}

// Normalize protocol and remove empty password colons for the mariadb driver
let databaseUrl = (process.env.DATABASE_URL || '').replace(/^mysql:\/\//, 'mariadb://');
databaseUrl = databaseUrl.replace(/:@/, '@');

const pool = createPool(databaseUrl);
const adapter = new PrismaMariaDb(pool);

export const prisma = global.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}
