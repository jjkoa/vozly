import { auth } from '../auth';

export const authClient = {
  signIn: {
    email: async ({ email, password }: { email: string; password: string }) => {
      return auth.signIn.email({ email, password });
    },
    social: async ({ provider }: { provider: 'google' }) => {
      return auth.signIn.social({ provider });
    }
  },
  signUp: {
    email: async ({ email, password, name }: { 
      email: string; 
      password: string;
      name: string 
    }) => {
      return auth.signUp.email({ email, password, name });
    }
  }
};