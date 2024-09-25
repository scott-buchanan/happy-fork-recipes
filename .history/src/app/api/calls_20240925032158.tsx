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
  let response: AxiosResponse;
  try {
    response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
      params: { apiKey: process.env.NEXT_PUBLIC_API_KEY },
    });
  } catch (err) {
    throw new Error(`Error getting recipe information: ${err}`);
  }

  if (response) {
    if (response.status !== 200) {
      // Set error message if API returns a non 200 response code.
      throw new Error(`Error getting recipe information: ${response.statusText}.`);
    } else {
      // Load cached recipes from localStorage
      const cachedRecipes: { recipes: Recipe[] } = JSON.parse(
        localStorage.getItem('recipes') || '{ "recipes": [] }',
      );

      // Push to array adding new recipe entry
      cachedRecipes.recipes.push(response.data);
      localStorage.setItem('recipes', JSON.stringify(cachedRecipes));

      return response.data;
    }
  }
}
