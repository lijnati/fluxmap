import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

function getPrismaClient(): PrismaClient {
  try {
    // Dynamic require so Vercel build environment handles native better-sqlite3 cleanly
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');
    const adapter = new PrismaBetterSqlite3({ url: 'file:./prisma/dev.db' });
    return new PrismaClient({ adapter });
  } catch (error) {
    console.warn('Prisma adapter fallback to standard client:', error);
    return new PrismaClient();
  }
}

export const prisma = globalForPrisma.prisma || getPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
