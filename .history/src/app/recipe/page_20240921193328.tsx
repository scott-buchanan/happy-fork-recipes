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
  const recipeId: number | null = searchParams.get('id')
    ? parseInt(searchParams.get('id')!, 10)
    : null;
  const [error, setError] = useState<string | null>(null);
  const [recipeData, setRecipeData] = useState<Recipe | null>(null);

  useEffect(() => {
    const getRecipe = async (id: number) => {
      const recipeDetails: { recipes: Recipe[] } = JSON.parse(
        localStorage.getItem('recipeDetails') || '{ "recipes": [] }',
      );

      // if recipe exists in localStorage, return recipe
      if (recipeDetails.recipes.length > 0) {
        const cachedRecipe: Recipe | undefined = recipeDetails.recipes.find(
          (recipe: Recipe) => recipe.id === recipeId,
        );
        if (cachedRecipe) {
          setRecipeData(cachedRecipe);
          return;
        }
      }

      console.log(process.env.NEXT_PUBLIC_API_KEY);
      const response: AxiosResponse | null = await axios
        .get(`https://api.spoonacular.com/recipes/${id}/information`, {
          params: { apiKey: process.env.NEXT_PUBLIC_API_KEY },
        })
        .catch((error) => {
          setError(`Error getting recipe information: ${error}.`);
          return null;
        });

      if (response) {
        if (response.status !== 200) {
          setError(`Error getting recipe information: ${response.statusText}.`);
        } else {
          setRecipeData(response.data);
          recipeDetails.recipes.push(response.data);
          localStorage.setItem('recipeDetails', JSON.stringify(recipeDetails));
        }
      }
    };

    // Check for recipe id and set error if none
    if (!recipeId) {
      setError('Please select a recipe.');
    } else {
      getRecipe(recipeId);
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
        <div>{JSON.stringify(recipeData)}</div>
      )}
    </PageTemplate>
  );
}
