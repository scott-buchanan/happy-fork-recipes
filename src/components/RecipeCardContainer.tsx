import { RecipeCard } from './RecipeCard';
import { Recipe } from '@/lib/types/types';
import SearchPagination from './search/SearchPagination';

interface Props {
  data?: { results?: Recipe[] | null; totalResults: number; error?: string } | null;
  pagination?: boolean;
}

export default function RecipeCardContainer({ data, pagination = false }: Props) {
  const resultCount = 6;
  let recipeCards: React.ReactNode;
  let message: string = '';

  if (!data) {
    recipeCards = Array.from({ length: resultCount }).map((_, index) => <RecipeCard key={index} />);
  } else {
    if (data.error) {
      message = data.error;
    } else if (data.results && data.results.length > 0) {
      recipeCards = data.results?.map((item: Recipe, index: number) => (
        <RecipeCard key={index} recipe={item} />
      ));
    } else {
      message = 'No recipes found.';
    }
  }

  return (
    <>
      {recipeCards && (
        <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {recipeCards}
        </div>
      )}
      {!recipeCards && message && <p className="text-center">{message}</p>}
      {pagination && data?.results && data.results.length > 0 && (
        <SearchPagination total={data.totalResults} pageButtonsRight />
      )}
    </>
  );
}
