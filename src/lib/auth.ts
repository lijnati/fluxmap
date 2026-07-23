import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { prisma } from '@/lib/db';

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET || 'heatmap_hub_secret_key_2026_super_secure_98765',
  baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:3000',
  database: prismaAdapter(prisma, {
    provider: 'sqlite',
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || 'mock_github_client_id',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || 'mock_github_client_secret',
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || 'mock_google_client_id',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'mock_google_client_secret',
    },
  },
});
