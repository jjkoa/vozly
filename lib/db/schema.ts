// lib/db/schema.ts
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('user', {
  id: text('id').notNull().primaryKey(),
  name: text('name'),
  email: text('email').notNull().unique(),
  emailVerified: integer('emailVerified', { mode: 'timestamp_ms' }),
  image: text('image'),
  createdAt: integer('createdAt', { mode: 'timestamp_ms' }).notNull(),
  updatedAt: integer('updatedAt', { mode: 'timestamp_ms' }).notNull(),
});

export const sessions = sqliteTable('session', {
  id: text('id').notNull().primaryKey(),
  expiresAt: integer('expiresAt', { mode: 'timestamp_ms' }).notNull(),
  token: text('token').notNull().unique(),
  createdAt: integer('createdAt', { mode: 'timestamp_ms' }).notNull(),
  updatedAt: integer('updatedAt', { mode: 'timestamp_ms' }).notNull(),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  userId: text('userId').notNull().references(() => users.id, { onDelete: 'cascade' }),
});

export const accounts = sqliteTable('account', {
  id: text('id').notNull().primaryKey(),
  accountId: text('accountId').notNull(),
  providerId: text('providerId').notNull(),
  userId: text('userId').notNull().references(() => users.id, { onDelete: 'cascade' }),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  idToken: text('idToken'),
  accessTokenExpiresAt: integer('accessTokenExpiresAt', { mode: 'timestamp_ms' }),
  refreshTokenExpiresAt: integer('refreshTokenExpiresAt', { mode: 'timestamp_ms' }),
  scope: text('scope'),
  password: text('password'),
  createdAt: integer('createdAt', { mode: 'timestamp_ms' }).notNull(),
  updatedAt: integer('updatedAt', { mode: 'timestamp_ms' }).notNull(),
});

export const verifications = sqliteTable('verification', {
  id: text('id').notNull().primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: integer('expiresAt', { mode: 'timestamp_ms' }).notNull(),
  createdAt: integer('createdAt', { mode: 'timestamp_ms' }).notNull(),
  updatedAt: integer('updatedAt', { mode: 'timestamp_ms' }).notNull(),
});

export const folders = sqliteTable('folders', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  userId: text('userId').notNull().references(() => users.id, { onDelete: 'cascade' }),
  parentId: text('parentId'), // For subfolders
  createdAt: integer('created_at', { mode: 'timestamp_ms' }).$defaultFn(() => new Date()),
});

export const files = sqliteTable('files', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  userId: text('userId').notNull().references(() => users.id, { onDelete: 'cascade' }),
  folderId: text('folderId').references(() => folders.id, { onDelete: 'cascade' }),
  url: text('url').notNull(), // URL to the stored audio file (e.g., in S3/R2)
  duration: integer('duration'), // in seconds
  size: integer('size'), // in bytes
  status: text('status', { enum: ['processing', 'completed', 'failed'] }).default('processing'),
  createdAt: integer('created_at', { mode: 'timestamp_ms' }).$defaultFn(() => new Date()),
  lastEdited: integer('last_edited', { mode: 'timestamp_ms' }).$defaultFn(() => new Date()),
});

export const transcriptions = sqliteTable('transcriptions', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  fileId: text('fileId').notNull().references(() => files.id, { onDelete: 'cascade' }),
  language: text('language').default('es'),
  // Storing segments as JSON is flexible
  segments: text('segments', { mode: 'json' }).$type<Array<{ speaker: string; start: number; end: number; text: string }>>(),
});