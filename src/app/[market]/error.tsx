'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Market catalog error:', error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400">
        <AlertTriangle className="h-7 w-7" />
      </div>
      <h2 className="mt-4 text-lg font-bold text-zinc-900 dark:text-zinc-100">
        Unable to load branding catalog
      </h2>
      <p className="mt-1 text-xs text-zinc-500 max-w-sm">
        We encountered a temporary issue retrieving localized catalog services. Please retry or refresh.
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-zinc-950 px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 transition-colors"
      >
        <RefreshCw className="h-3.5 w-3.5" />
        <span>Try Again</span>
      </button>
    </div>
  );
}
