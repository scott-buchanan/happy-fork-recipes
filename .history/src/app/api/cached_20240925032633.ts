/**
 *
 * @param {number} id - The recipe id
 * @returns {Recipe | null}
 */
export function getCachedRecipe(id: number) {
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
