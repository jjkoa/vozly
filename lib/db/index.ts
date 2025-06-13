import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import path from 'path';
import * as schema from './schema';

const defaultDbPath = path.resolve('./vozly.db');
const dbPath = process.env.DATABASE_URL
  ? process.env.DATABASE_URL.replace(/^file:/, '')
  : defaultDbPath;
const finalDbPath = path.isAbsolute(dbPath) ? dbPath : path.resolve(dbPath);

const sqlite = new Database(finalDbPath);
export const db = drizzle(sqlite, { schema });
