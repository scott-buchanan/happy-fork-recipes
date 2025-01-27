import { Recipe, SimilarRecipe } from '@/lib/types/types';
import { getImage } from '@/lib/utils/getImage';
import { cardCount } from '../constants/constants';
import { SearchResult, SearchResults } from '../types/search';

const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Retrieves a random food trivia from the Spoonacular API.
 * @returns { results?: { text: string }; error?: string;}
 */
export async function getTrivia(): Promise<{
  results?: { text: string };
  error?: string;
}> {
  try {
    const response = await fetch(
      `https://api.spoonacular.com/food/trivia/random?apiKey=${apiKey}`,
      {
        method: 'GET',
        next: { revalidate: 86400 },
      },
    );
    const results = await response.json();
    return { results };
  } catch (err) {
    return {
      error: 'Something went wrong: ' + (err instanceof Error ? err.message : String(err)),
    };
  }
}

/**
 * Gets the featured recipes from localStorage or API and returns if they exist.
 * @param count - number of recipes to return
 * @returns { results: Recipe[] | null; error?: string;}
 */
export async function getFeaturedRecipes(): Promise<{
  results?: Recipe[];
  error?: string;
}> {
  // await new Promise((resolve) => {
  //   setTimeout(resolve, 5000);
  // });
  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/random?apiKey=${process.env.NEXT_PUBLIC_API_KEY}&number=${cardCount}`,
      {
        method: 'GET',
        next: { revalidate: 86400 },
      },
    );

    const res = await response.json();
    const recipes: Recipe[] = await Promise.all(
      res.recipes.map(async (recipe: Recipe) => {
        const { base64, img } = await getImage(recipe.image);
        return {
          ...recipe,
          dataUrl: base64,
          img: img,
        };
      }),
    );

    console.log('HEADERS: ', response.headers.get('cf-cache-status'));
    return { results: recipes };
  } catch (err) {
    return {
      error: 'Something went wrong: ' + (err instanceof Error ? err.message : String(err)),
    };
  }
}

/**
 * Gets recipe information from localStorage or API and returns if they exist.
 * @param id - recipe id
 * @returns { results: Recipe | null; error?: string;}
 */
export async function getRecipe(id: string | null): Promise<{ results?: Recipe; error?: string }> {
  if (!id) return { error: 'No recipe id supplied.' };

  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.NEXT_PUBLIC_API_KEY}`,
      {
        method: 'GET',
        next: { revalidate: 86400 },
      },
    );

    let res = await response.json();

    const { base64, img } = await getImage(res.image);
    res = { ...res, ...{ dataUrl: base64, img } };
    console.log('HEADERS: ', response.headers.get('cf-cache-status'));

    return { results: res };
  } catch (err) {
    return {
      error: `Error getting recipe information: ${err instanceof Error ? err.message : err}`,
    };
  }
}

/**
 * Gets similar recipes to the supplied recipe id from localStorage or API and returns if they exist.
 * @param id - recipe id
 * @returns { results: SimilarRecipe[] | null; error?: string;}
 */
export async function getSimilarRecipes(id: string | null): Promise<{
  results?: SimilarRecipe[] | null;
  error?: string;
}> {
  if (!id) return { error: 'No recipe id supplied.' };

  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/${id}/similar?apiKey=${process.env.NEXT_PUBLIC_API_KEY}&number=5`,
      {
        method: 'GET',
        next: { revalidate: 86400 },
      },
    );

    const res = await response.json();

    return { results: res };
  } catch (err) {
    return {
      error: `Error getting similar recipes: ${err instanceof Error ? err.message : err}`,
    };
  }
}

/**
 * Searches for recipes using the Spoonacular API.
 * @param query
 * @param cuisine
 * @param page
 * @param pageSize
 * @returns { results: SearchResult[] | null; totalResults?: number; error?: string;}
 */
export async function getSearchRecipes(
  query: string | null,
  cuisine: string | null,
  page: string,
  pageSize: number = cardCount,
): Promise<{
  results: SearchResult[] | null;
  totalResults: number | null;
  error?: string;
}> {
  try {
    const offset = (Math.max(parseInt(page) - 1, 0) * pageSize).toString();
    const params = new URLSearchParams({
      apiKey: process.env.NEXT_PUBLIC_API_KEY ?? '',
      query: query ?? '',
      cuisine: cuisine ?? '',
      offset,
      number: pageSize.toString(),
      sort: 'popularity',
    });
    const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?${params}`, {
      method: 'GET',
      next: { revalidate: 86400 },
    });

    const res = await response.json();
    const recipes: SearchResult[] = await Promise.all(
      res.results.map(async (recipe: SearchResult) => {
        const { base64, img } = await getImage(recipe.image);
        return {
          ...recipe,
          dataUrl: base64,
          img: img,
        };
      }),
    );

    return { results: recipes, totalResults: res.totalResults };
  } catch (err) {
    return {
      results: null,
      totalResults: null,
      error: 'Something went wrong: ' + (err instanceof Error ? err.message : String(err)),
    };
  }
}
