// app/lib/actions/auth-actions.ts
'use server';

import { signOut } from '@/app/lib/auth';

export async function handleSignOut() {
  await signOut({ redirectTo: '/' });
}