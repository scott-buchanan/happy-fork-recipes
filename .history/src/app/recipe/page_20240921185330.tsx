'use client';

import Link from 'next/link';
import PageTemplate from '../components/pageTemplate';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axios, { AxiosResponse } from 'axios';
import { Recipe } from '../types/types';

// Recipe details page
export default function RecipeDetails() {
  const searchParams = useSearchParams();
  const recipeId: string | null = searchParams.get('id') || null;
  const [error, setError] = useState<string | null>(null);
  const [recipeData, setRecipeData] = useState<Recipe | null>(null);

  // recipe API call
  async function getRecipe(id: string) {
    return await axios.get(`https://api.spoonacular.com/recipes/${id}/information`);
  }

  useEffect(() => {
    // Check for recipe id and set error if none
    if (!recipeId) {
      setError('Please select a recipe.');
    } else {
      const response: AxiosResponse = getRecipe(recipeId);

      if (response.status !== 200) {
        setError(`Error getting recipe information: ${response.statusText}`);
      } else {
      }
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
