import { RecipeCard } from '@/components/recipeCards/RecipeCard';
import { Recipe } from '@/lib/types/types';
import SearchPagination from '@/components/search/SearchPagination';
import { SearchResults } from '@/lib/types/search';

interface RecipeCardContainerProps {
  data: SearchResults;
  pagination?: boolean;
}

export default function RecipeCardContainer({
  data,
  pagination = false,
}: RecipeCardContainerProps) {
  // Error state
  if (data.error) {
    return <p className="my-8 text-center">{data.error}</p>;
  }

  // Empty state
  if (data.results?.length === 0) {
    return <p className="my-8 text-center">No recipes found.</p>;
  }

  return (
    <>
      <div className="my-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {data.results?.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe as Recipe} />
        ))}
      </div>
      {pagination && <SearchPagination total={data.totalResults} pageButtonsRight />}
    </>
  );
}
