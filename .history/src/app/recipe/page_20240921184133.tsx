'use client';

import Link from 'next/link';
import PageTemplate from '../components/pageTemplate';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axios, { AxiosResponse } from 'axios';

// Recipe details page
export default function RecipeDetails() {
  const searchParams = useSearchParams();
  const recipeId: number = searchParams.get('id');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getRecipe(id: number) {
      return await axios.get(`https://api.spoonacular.com/recipes/${id}/information`);
    }

    // Check for recipe id and set error if none
    if (!recipeId) {
      setError('Please select a recipe.');
    } else {
      const response: AxiosResponse = getRecipe(recipeId);
    }
  }, [recipeId]);

  return (
    <PageTemplate>
      <h1>Recipe page</h1>
      {/* Display an error if no recipe id or invalid id */}
      {error ? (
        <div>
          {error} <Link href="/">Go Home</Link> to select a featured recipe or search in the box
          above.
        </div>
      ) : (
        // If id is valid, show recipe
        <div>Non error stuff</div>
      )}
    </PageTemplate>
  );
}
