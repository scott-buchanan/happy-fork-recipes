import { Recipe } from '../types/types';

/**
 *
 * @param {number} id - The recipe id
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

export function addRecipeCache(recipe: Recipe): void {
  // Load cached recipes from localStorage
  const cachedRecipes: { recipes: Recipe[] } = JSON.parse(
    localStorage.getItem('recipes') || '{ "recipes": [] }',
  );

  // Push to array adding new recipe entry
  cachedRecipes.recipes.push(recipe);
  localStorage.setItem('recipes', JSON.stringify(cachedRecipes));
}
