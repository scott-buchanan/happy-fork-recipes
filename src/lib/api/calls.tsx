import { Recipes, Recipe, SimilarRecipes, SearchResult, SearchResults } from '../types/types';
import axios, { AxiosResponse } from 'axios';
import {
  getCachedRecipe,
  addRecipeCache,
  getCachedSimilarRecipes,
  addSimilarRecipesCache,
  getCachedFeaturedRecipes,
  addFeaturedRecipeCache,
  getCachedSearchRecipes,
  addSearchRecipeCache,
} from './cached';
import { getImage } from '../utils/getImage';

/**
 * Gets recipe information from localStorage or API and returns if they exist.
 * @param id - recipe id
 * @returns { recipe: Recipe | null; error?: string;}
 */
export async function getRecipe(id: number): Promise<{ recipe: Recipe | null; error?: string }> {
  if (!id) return { recipe: null, error: 'No recipe id supplied.' };

  // If recipe is cached, return cached data
  const cached = getCachedRecipe(id);
  if (cached) {
    return { recipe: cached };
  }

  // API call
  let response: AxiosResponse<Recipe>;
  try {
    response = await axios.get<Recipe>(`https://api.spoonacular.com/recipes/${id}/information`, {
      params: { apiKey: process.env.NEXT_PUBLIC_API_KEY },
    });
  } catch (err) {
    return {
      recipe: null,
      error: `Error getting recipe information: ${err instanceof Error ? err.message : err}`,
    };
  }

  if (response) {
    if (response.status !== 200) {
      // return error message if API returns a non 200 response code.
      return {
        recipe: null,
        error: `Error getting recipe information: ${response.statusText}`,
      };
    } else {
      const { base64, img } = await getImage(response.data.image);
      response.data = { ...response.data, ...{ dataUrl: base64, img } };
      addRecipeCache(response.data);
      return { recipe: response.data };
    }
  }

  return { recipe: null, error: 'Something went wrong' };
}

/**
 * Gets similar recipes to the supplied recipe id from localStorage or API and returns if they exist.
 * @param id - recipe id
 * @returns { similarRecipes: SimilarRecipes | null; error?: string;}
 */
export async function getSimilarRecipes(
  id: number,
): Promise<{ similarRecipes: SimilarRecipes | null; error?: string }> {
  if (!id) return { similarRecipes: null, error: 'No recipe id supplied.' };

  // If similar recipes are cached, return cached data
  const cached = getCachedSimilarRecipes(id);
  if (cached) {
    return { similarRecipes: cached };
  }

  // API call
  let response: AxiosResponse;
  try {
    response = await axios.get(`https://api.spoonacular.com/recipes/${id}/similar?number=5`, {
      params: { apiKey: process.env.NEXT_PUBLIC_API_KEY },
    });
  } catch (err) {
    return {
      similarRecipes: null,
      error: `Error getting similar recipes: ${err instanceof Error ? err.message : err}`,
    };
  }

  if (response) {
    if (response.status !== 200) {
      // return error message if API returns a non 200 response code.
      return {
        similarRecipes: null,
        error: `Error getting similar recipes: ${response.statusText}.`,
      };
    } else {
      addSimilarRecipesCache(id, response.data);
      return { similarRecipes: { recipeId: id, similarRecipes: response.data } };
    }
  }

  return { similarRecipes: null, error: 'Something went wrong.' };
}

/**
 * Gets the featured recipes from localStorage or API and returns if they exist.
 * @returns { recipes: Recipe[] | null; error?: string;}
 */
export async function getFeaturedRecipes(): Promise<{
  recipes: Recipe[] | null;
  error?: string;
}> {
  // If recipe is cached, return cached data
  const cached: Recipes | null = getCachedFeaturedRecipes();
  if (cached) {
    return cached;
  }

  // API call
  let response: AxiosResponse<Recipes>;
  try {
    response = await axios.get<Recipes>(`https://api.spoonacular.com/recipes/random?number=6`, {
      params: { apiKey: process.env.NEXT_PUBLIC_API_KEY },
    });
  } catch (err) {
    return {
      recipes: null,
      error: `Error getting recipe information: ${err instanceof Error ? err.message : err}`,
    };
  }

  if (response) {
    if (response.status !== 200) {
      // return error message if API returns a non 200 response code.
      return {
        recipes: null,
        error: `Error getting recipe information: ${response.statusText}`,
      };
    } else {
      const recipes: Recipe[] = await Promise.all(
        response.data.recipes.map(async (recipe) => {
          const { base64, img } = await getImage(recipe.image);
          return {
            ...recipe,
            dataUrl: base64,
            img: img,
          };
        }),
      );

      addFeaturedRecipeCache({ recipes: recipes });
      return { recipes: recipes };
    }
  }

  return { recipes: null, error: 'Something went wrong' };
}

export async function getSearchRecipes(
  query: string = '',
  cuisine: string = '',
): Promise<SearchResults> {
  // If recipe is cached, return cached data
  const cached: SearchResults | null = getCachedSearchRecipes(query, cuisine);
  if (cached) {
    return cached;
  }

  // API call
  let response;
  try {
    response = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?query=${query}&cuisine=${cuisine}&number=6`,
      {
        params: { apiKey: process.env.NEXT_PUBLIC_API_KEY },
      },
    );
  } catch (err) {
    return {
      query: null,
      cuisine: null,
      recipes: [],
      error: `Error getting recipe information: ${err instanceof Error ? err.message : err}`,
    };
  }

  if (response) {
    if (response.status !== 200) {
      // return error message if API returns a non 200 response code.
      return {
        query: null,
        cuisine: null,
        recipes: [],
        error: `Error getting search results: ${response.statusText}`,
      };
    } else {
      const results = await Promise.all(
        response.data.results.map(async (recipe: SearchResult) => {
          const { base64, img } = await getImage(recipe.image);
          return {
            ...recipe,
            dataUrl: base64,
            img: img,
          };
        }),
      );

      addSearchRecipeCache({ query, cuisine, recipes: results });
      return { ...response.data, recipes: results };
    }
  }
  return { query: null, cuisine: null, recipes: [], error: 'Something went wrong' };
}
