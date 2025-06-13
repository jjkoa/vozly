//lib/auth.ts
import { betterAuth } from "better-auth"
import { nextCookies } from "better-auth/next-js"

export const auth = betterAuth({
  database: {
    provider: "sqlite",
    url: process.env.DATABASE_URL ?? 'file:./vozly.db',
  },
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