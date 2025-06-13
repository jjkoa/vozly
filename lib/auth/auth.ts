'use server'
import { betterAuth } from "better-auth"
import { nextCookies } from "better-auth/next-js"
import Database from "better-sqlite3"
import path from 'path'

// Create the database path
const dbPath = path.resolve(process.env.DATABASE_URL || './lib/db/vozly.db')

export const auth = betterAuth({
  database: new Database(dbPath),
  // OR use the adapter format:
  // database: {
  //   provider: "sqlite",
  //   url: `file:${dbPath}`,
  // },
  
  secret: process.env.AUTH_SECRET!,
  baseURL: process.env.AUTH_URL!,
  socialProviders: {
    google: {
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendOnSignUp: true,
    callbackURL: `${process.env.AUTH_URL}/api/auth/verify-email`,
  },
  plugins: [
    nextCookies() 
  ]
})