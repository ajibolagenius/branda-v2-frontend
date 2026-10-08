'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => console.error(error), [error]);

  return (
    <div className="wrap py-24 text-center sm:py-32">
      <h1 className="display text-[clamp(3rem,8vw,6.5rem)]">Something broke.</h1>
      <p className="mt-4 text-muted">That one is on us. Try again, and if it keeps happening, refresh the page.</p>
      <button type="button" onClick={reset} className="btn btn-dark mt-10">Try again</button>
    </div>
  );
}
