import type { Config } from 'drizzle-kit';
import path from 'path';

const dbUrl = process.env.DATABASE_URL
  ? process.env.DATABASE_URL.startsWith('file:')
    ? process.env.DATABASE_URL
    : `file:${path.resolve(process.env.DATABASE_URL)}`
  : `file:${path.resolve('./src/lib/db/vozly.db')}`;

export default {
  schema: 'src/lib/db/schema.ts',
  out: 'src/lib/db/sqlite/drizzle',
  dialect: 'sqlite',
  dbCredentials: {
    url: dbUrl,
  },
} satisfies Config;
