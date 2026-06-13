import { PageTemplate } from '../../components/layout/PageTemplate';
import Loading from './loading';
import { Suspense } from 'react';
import RecipeDetails from '@/components/recipe/RecipeDetails';
import RecipeNotFound from '@/components/recipe/RecipeNotFound';

interface RecipeDetailsPageProps {
  searchParams: {
    id?: string;
  };
}

/**
 * Recipe details page (server component)
 * Suspense handles loading state while RecipeDetails fetches data
 */
export default function RecipeDetailsPage({ searchParams }: RecipeDetailsPageProps) {
  const recipeId = searchParams.id;

  return (
    <PageTemplate>
      {recipeId ? (
        <Suspense key={recipeId} fallback={<Loading useTemplate={false} />}>
          <RecipeDetails id={recipeId} />
        </Suspense>
      ) : (
        // id search param is missing, show error message
        <RecipeNotFound />
      )}
    </PageTemplate>
  );
}
