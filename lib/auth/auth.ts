'use server'
import { betterAuth } from "better-auth"
import { nextCookies } from "better-auth/next-js"
import { username } from "better-auth/plugins"
import Database from "better-sqlite3"
import path from 'path'
import { Resend } from 'resend'

// Create the database path
const dbPath = path.resolve(process.env.DATABASE_URL || './lib/db/vozly.db')

const resend = new Resend(process.env.RESEND_API_KEY!);

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
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      await resend.emails.send({
        from: process.env.EMAIL_FROM!,
        to: user.email,
        subject: 'Verify your email address',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Verify Your Email Address</h2>
            <p>Hello ${user.name || 'there'},</p>
            <p>Thank you for signing up! Please click the button below to verify your email address:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${url}" 
                 style="background-color: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                Verify Email Address
              </a>
            </div>
            <p>If the button doesn't work, you can also click this link:</p>
            <p><a href="${url}">${url}</a></p>
            <p>This verification link will expire in 1 hour.</p>
            <p>If you didn't create an account, you can safely ignore this email.</p>
          </div>
        `,
      });
    },
  },
  plugins: [
    nextCookies(),
    username()
  ]
})