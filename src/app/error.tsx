'use client';

import { useEffect } from 'react';
import { PageTemplate } from '@/components/layout/PageTemplate';

interface ErrorPageProps {
  error: Error & { digest?: string };
}

export default function ErrorPage({ error }: ErrorPageProps) {
  useEffect(() => {
    console.error('Route Error:', error);
  }, [error]);

  return (
    <PageTemplate>
      <section className="flex flex-col items-center justify-center px-6 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">Something went wrong</h1>

        <p className="mb-8 max-w-lg">We couldn&#39;t complete your request.</p>

        <div className="flex gap-4">
          <a
            href="/"
            className="rounded-lg border border-gray-300 px-6 py-3 transition hover:bg-gray-100"
          >
            Go home
          </a>
        </div>
      </section>
    </PageTemplate>
  );
}
