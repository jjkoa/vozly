import type { Config } from 'drizzle-kit';

export default {
  schema: 'lib/db/schema.ts',
  out: 'lib/db/sqlite/drizzle',
  dialect: 'sqlite',
  dbCredentials: {
    url: process.env.DATABASE_URL ?? 'file:./lib/db/vozly.db',
  },
} satisfies Config;
