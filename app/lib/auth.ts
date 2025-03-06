import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from '../../auth.config';
import { z } from 'zod';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcryptjs';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User[]>`SELECT * FROM users WHERE email=${email}`;

    if (!user.length) {
      console.log("❌ User not found for email:", email);
      return undefined;
    }

    console.log("✅ User found:", user[0]);
    return user[0];
  } catch (error) {
    console.error("❌ Database error:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) {
          console.log("❌ Invalid credentials format!");
          return null;
        }

        const { email, password } = parsedCredentials.data;
        console.log("🔍 Checking login for:", email);

        const user = await getUser(email);
        if (!user) {
          console.log("❌ User not found!");
          return null;
        }

        console.log("🔍 Checking password...");
        const passwordsMatch = await bcrypt.compare(password, user.password);

        if (!passwordsMatch) {
          console.log("❌ Password does not match!");
          return null;
        }

        console.log("✅ Login successful!");
        return user;
      },
    }),
  ],
});
