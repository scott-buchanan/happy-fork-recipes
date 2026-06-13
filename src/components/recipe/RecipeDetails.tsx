import RecipeInfo from '@/components/recipe/RecipeInfo';
import Ingredients from '@/components/recipe/RecipeIngredients';
import SimilarRecipesList from '@/components/recipe/SimilarRecipes';
import { getRecipe, getSimilarRecipes } from '@/lib/api/api';
import { Recipe, SimilarRecipe } from '@/lib/types/types';
import RecipeNotFound from '@/components/recipe/RecipeNotFound';

interface RecipeData {
  results?: Recipe | null;
  error?: string;
}
interface SimilarRecipes {
  results?: SimilarRecipe[] | null;
  error?: string;
}

async function fetchRecipeData(id: string): Promise<[RecipeData, SimilarRecipes]> {
  return Promise.all([getRecipe(id), getSimilarRecipes(id)]);
}

export default async function RecipeDetails({ id }: { id: string }) {
  const [recipeData, similarRecipes]: [RecipeData, SimilarRecipes] = await fetchRecipeData(id);

  if (!recipeData.results) {
    return <RecipeNotFound />;
  }

  return (
    <div className="flex">
      <article className="flex-grow">
        <div className="py-5">
          <RecipeInfo recipeData={recipeData.results} error={recipeData.error} />
        </div>

        {/* Ingredients - small screens */}
        <div className="block py-5 lg:hidden">
          <Ingredients recipeData={recipeData.results} />
        </div>

        {/* Similar Recipes */}
        {similarRecipes.results && similarRecipes.results.length > 0 && (
          <div className="py-5">
            <SimilarRecipesList recipes={similarRecipes.results} />
          </div>
        )}
      </article>

      {/* Ingredients - right side large screens */}
      <aside className="hidden py-5 lg:block">
        <div className="lg:ml-10 lg:w-96">
          <Ingredients recipeData={recipeData.results} />
        </div>
      </aside>
    </div>
  );
}
