import { PageTemplate } from '../../components/layout/PageTemplate';
import { Recipe, SimilarRecipe } from '@/lib/types/types';
import SimilarRecipesList from '@/components/SimilarRecipes';
import Info from '@/components/RecipeInfo';
import Ingredients from '@/components/RecipeIngredients';
import { getRecipe, getSimilarRecipes } from '@/lib/api/api';
import Loader from '@/components/loaders/Loader';

interface Props {
  searchParams: {
    [key: string]: string;
  };
}
interface RecipeData {
  results?: Recipe | null;
  pointsUsed?: number;
  error?: string;
}
interface SimilarRecipes {
  results?: SimilarRecipe[] | null;
  pointsUsed?: number;
  error?: string;
}
const Props = {
  searchParams: {
    type: 'object',
    required: true,
  },
};

// Recipe details page
export default async function RecipeDetails({ searchParams }: Props) {
  const recipeId = searchParams.id || null;
  const [recipeData, similarRecipes]: [RecipeData, SimilarRecipes] = await Promise.all([
    getRecipe(recipeId),
    getSimilarRecipes(recipeId),
  ]);

  let pointsUsed: number | null = null;
  if (recipeData.pointsUsed && similarRecipes.pointsUsed) {
    pointsUsed =
      recipeData.pointsUsed > similarRecipes.pointsUsed
        ? recipeData.pointsUsed
        : similarRecipes.pointsUsed;
  }

  return (
    <PageTemplate key={recipeId}>
      <article className="flex">
        <div className="flex-grow">
          <div className="py-5">
            <Info recipeData={recipeData.results} error={recipeData.error} />
          </div>

<Loader lines={15} className="mb-16" />
          {/* Ingredients - small screens */}
          <div className="block py-5 lg:hidden">
            <Ingredients recipeData={recipeData.results} />
          </div>

          {/* Similar Recipes */}
          <div className="py-5">
            <SimilarRecipesList recipes={similarRecipes.results} />
          </div>
        </div>

        {/* Ingredients - right side large screens */}
        <aside className="hidden py-5 lg:block">
          <div className="lg:ml-10 lg:w-96">
            <Ingredients recipeData={recipeData.results} />
          </div>
        </aside>
      </article>
    </PageTemplate>
  );
}
