import { Recipes, Recipe, SimilarRecipe, SimilarRecipes } from '../types/types';
import { SearchResults } from '../types/search';
/**
 * Gets recipe from localStorage and returns if they exist.
 * @param {number} id - recipe id
 * @returns {Recipe | null}
 */
export function getCachedRecipe(id: number): Recipe | null {
  const cachedRecipes: { recipes: Recipe[] } = JSON.parse(
    localStorage.getItem('recipes') || '{ "recipes": [] }',
  );

  if (cachedRecipes.recipes.length > 0) {
    const cachedRecipe: Recipe | undefined = cachedRecipes.recipes.find(
      (recipe: Recipe) => recipe.id === id,
    );
    if (cachedRecipe) {
      return cachedRecipe;
    }
  }
  return null;
}

/**
 * Adds recipe to localStorage
 * @param {Recipe} recipe - Recipe id
 * @returns {void}
 */
export function addRecipeCache(recipe: Recipe): void {
  // Load cached recipes from localStorage
  const cachedRecipes: { recipes: Recipe[] } = JSON.parse(
    localStorage.getItem('recipes') || '{ "recipes": [] }',
  );

  // Push to array adding new recipe entry
  cachedRecipes.recipes.push(recipe);
  localStorage.setItem('recipes', JSON.stringify(cachedRecipes));
}

/**
 * Gets the similar recipes from localStorage and returns if they exist.
 * @param {number} id - Recipe id
 * @returns {SimilarRecipes | null}
 */
export function getCachedSimilarRecipes(id: number): SimilarRecipes | null {
  const cachedSimilarTotal: { similarRecipes: SimilarRecipes[] } = JSON.parse(
    localStorage.getItem('similarRecipes') || '{ "similarRecipes": [] }',
  );

  console.log(cachedSimilarTotal);
  if (cachedSimilarTotal.similarRecipes.length > 0) {
    const cachedSimilar: SimilarRecipes | undefined = cachedSimilarTotal.similarRecipes.find(
      (recipe: SimilarRecipes) => recipe.recipeId === id,
    );
    if (cachedSimilar) {
      return cachedSimilar;
    }
  }
  return null;
}

/**
 * Adds similar recipes to localStorage
 * @param {number} id - Recipe id
 * @param {SimilarRecipe[]} recipes - Recipes
 * @returns {void}
 */
export function addSimilarRecipesCache(id: number, recipes: SimilarRecipe[]): void {
  // Load cached recipes from localStorage
  const cachedSimilarRecipes: { similarRecipes: SimilarRecipes[] } = JSON.parse(
    localStorage.getItem('similarRecipes') || '{ "similarRecipes": [] }',
  );

  // Push to array adding new recipe entry
  cachedSimilarRecipes.similarRecipes.push({
    recipeId: id,
    similarRecipes: recipes,
  });
  localStorage.setItem('similarRecipes', JSON.stringify(cachedSimilarRecipes));
}

/**
 * Gets the featured recipes from localStorage and returns if they exist.
 * @returns {Recipes | null}
 */
export function getCachedFeaturedRecipes(): Recipes | null {
  const featured: Recipes = JSON.parse(
    localStorage.getItem('featuredRecipes') || '{ "recipes": [] }',
  );

  if (featured.recipes.length > 0) {
    return featured;
  }
  return null;
}

/**
 * Adds featured recipes to localStorage
 * @param {Recipes} recipes - Recipe id
 *  @returns {void}
 */
export function addFeaturedRecipeCache(recipes: Recipes): void {
  localStorage.setItem('featuredRecipes', JSON.stringify(recipes));
}

/**
 * Gets the search recipes from localStorage and returns if they exist.
 * @param {string} query - search query
 * @param {string} cuisine - cuisine
 * @returns SearchResults | null
 */
export function getCachedSearchRecipes(query: string, cuisine: string): SearchResults | null {
  const cachedSearchTotal: { searchResults: SearchResults[] } = JSON.parse(
    localStorage.getItem('searchRecipes') || '{ "searchResults": [] }',
  );

  if (cachedSearchTotal.searchResults.length > 0) {
    const cachedSearch: SearchResults | undefined = cachedSearchTotal.searchResults.find(
      (item: SearchResults) => item.query === query && item.cuisine === cuisine,
    );

    if (cachedSearch) {
      return cachedSearch;
    }
  }
  return null;
}

/**
 * Adds search recipes to localStorage
 * @param {string} query - search query
 * @param {string} cuisine - cuisine
 * @param {SearchResult[]} recipes - Recipes
 * @returns {void}
 */
export function addSearchRecipeCache(searchResults: SearchResults): void {
  // Load cached search results from localStorage
  const cachedSearchRecipes: { searchResults: SearchResults[] } = JSON.parse(
    localStorage.getItem('searchRecipes') || '{ "searchResults": [] }',
  );

  cachedSearchRecipes.searchResults.push(searchResults);
  localStorage.setItem('searchRecipes', JSON.stringify(cachedSearchRecipes));
}
