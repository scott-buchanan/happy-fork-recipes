'use client';

import Link from 'next/link';
import PageTemplate from '../components/pageTemplate';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function Recipe() {
  const searchParams = useSearchParams();
  const recipeId = searchParams.get('id');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for recipe id and set error if none
    if (!recipeId) {
      setError('Please select a recipe.');
    }
  }, [recipeId]);

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
      {error && (
        <div>
          <h1>
            {error} <Link href="/">Go Home</Link> to select a featured recipe or search in the box
            above.
          </h1>
        </div>
      )}
    </PageTemplate>
  );
}
