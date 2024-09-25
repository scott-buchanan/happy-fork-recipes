'use client';
import Link from 'next/link';
import PageTemplate from '../components/pageTemplate';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Recipe() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for recipe id and set error if none
    if (!router.query.id) {
      setError('Please select a recipe.');
    }
  }, [router.query]);

  if (error) {
    return (
      <div>
        <h1>
          {error} <Link href="/">Go Home</Link> to select a featured recipe or search in the box
          above.
        </h1>
      </div>
    );
  }

  return (
    <PageTemplate>
      <h1>Recipe page</h1>
    </PageTemplate>
  );
}
