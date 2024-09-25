'use client';
import PageTemplate from '../components/pageTemplate';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Recipe() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if there is a query string in the URL
    if (Object.keys(router.query).length === 0) {
      setError('Error: No query string found!');
    }
  }, [router.query]);

  if (error) {
    return (
      <div>
        <h1>{error}</h1>
      </div>
    );
  }

  return (
    <PageTemplate>
      <h1>Recipe page</h1>
    </PageTemplate>
  );
}
