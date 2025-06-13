'use client'
import { auth } from './auth';
import { createAuthClient } from "better-auth/client"
import { usernameClient } from "better-auth/client/plugins"
// `better-auth` types currently do not expose signIn/signUp helpers.
// Cast to `any` to access these methods until official typings are updated.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const authClient = createAuthClient({
  plugins: [usernameClient()]
});

export { authClient };