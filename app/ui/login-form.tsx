'use client';

import { lusitana } from '@/app/ui/font';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from './button';
import { useActionState } from 'react';
import { authenticate } from '@/app/lib/actions';
import { useSearchParams } from 'next/navigation';

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <form action={formAction} className="space-y-6">
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-teal-500 to-teal-700 px-4 py-8">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8 space-y-6">
          <h1
            className={`${lusitana.className} text-center text-3xl font-bold text-teal-600`}
          >
            Welcome Back!
          </h1>
          <p className="text-center text-sm text-gray-600">
            Please log in to continue.
          </p>

          {/* Email Field */}
          <div className="relative">
            <label
              htmlFor="email"
              className="block text-xs font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <AtSymbolIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="peer block w-full rounded-lg border border-gray-200 py-3 pl-10 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all placeholder:text-gray-400"
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-xs font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <KeyIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              required
              minLength={6}
              className="peer block w-full rounded-lg border border-gray-200 py-3 pl-10 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all placeholder:text-gray-400"
            />
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="flex items-center space-x-2 text-red-500 text-sm">
              <ExclamationCircleIcon className="h-5 w-5" />
              <p>{errorMessage}</p>
            </div>
          )}

          {/* Hidden Input for Redirect */}
          <input type="hidden" name="redirectTo" value={callbackUrl} />

          {/* Login Button */}
          <Button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 ease-in-out shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-300 focus:ring-offset-2"
            aria-disabled={isPending}
          >
            {isPending ? (
              <span className="animate-pulse">Logging in...</span>
            ) : (
              <>
                Log In <ArrowRightIcon className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>

          {/* Additional Links */}
          <div className="text-center text-sm text-gray-600">
            <a href="/forgot-password" className="text-teal-500 hover:underline">
              Forgot your password?
            </a>
          </div>
        </div>
      </div>
    </form>
  );
}