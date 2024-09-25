import { ReactNode } from 'react';
import { Recipe } from '../types/types';
import axios, { AxiosResponse } from 'axios';

// get recipe from API
export async function getRecipe(id: number): Promise<Recipe | null | ReactNode> {
  if (!id) return null;
  // If recipe is cached, return cached data
  //   const cached = getCachedRecipe(id);
  //   if (cached) {
  //     console.log('cached recipe: ', cached);
  //     setRecipeData(cached);
  //     return;
  //   }

  // API call
  const response: AxiosResponse | null = await axios
    .get(`https://api.spoonacular.com/recipes/${id}/information`, {
      params: { apiKey: process.env.NEXT_PUBLIC_API_KEY },
    })
    .catch((error) => {
      // Set error message for display is API call fails
      return <p>`Error getting recipe information: ${error}.`</p>;
    });

  if (response) {
    if (response.status !== 200) {
      // Set error message if API returns a non 200 response code.
      setError(`Error getting recipe information: ${response.statusText}.`);
    } else {
      // Set recipe data if response was good.
      setRecipeData(response.data);

      // Load cached recipes from localStorage
      const cachedRecipes: { recipes: Recipe[] } = JSON.parse(
        localStorage.getItem('recipes') || '{ "recipes": [] }',
      );
      // Push to array adding new recipe entry
      cachedRecipes.recipes.push(response.data);
      localStorage.setItem('recipes', JSON.stringify(cachedRecipes));
    }
  }
}
