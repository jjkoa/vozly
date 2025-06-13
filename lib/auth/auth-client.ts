import { auth } from './auth';

// `better-auth` types currently do not expose signIn/signUp helpers.
// Cast to `any` to access these methods until official typings are updated.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const authAny = auth as any;

export const authClient = {
  signIn: {
    email: async ({ email, password }: { email: string; password: string }) => {
      return authAny.signIn.email({ email, password });
    },
    social: async ({ provider }: { provider: 'google' }) => {
      return authAny.signIn.social({ provider });
    }
  },
  signUp: {
    email: async ({ email, password, name }: { 
      email: string; 
      password: string;
      name: string 
    }) => {
      return authAny.signUp.email({ email, password, name });
    }
  }
};