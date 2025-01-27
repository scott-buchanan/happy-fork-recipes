import RecipeCardContainer from './RecipeCardContainer';
import { getFeaturedRecipes } from '@/lib/api/api';
import { Recipe } from '@/lib/types/types';

interface FeaturedRecipesResponse {
  results?: Recipe[];
  pointsUsed?: number;
  error?: string;
}

export default async function FeaturedRecipes() {
  const data: FeaturedRecipesResponse = await getFeaturedRecipes();
  return (
    <>
      <h2 className="mb-6 mt-3">Featured Recipes</h2>
      {data.error && <p>{data.error}</p>}
      {data.results && <RecipeCardContainer data={data} />}
    </>
  );
}
