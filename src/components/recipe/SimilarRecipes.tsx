import Link from 'next/link';
import { SimilarRecipe } from '@/lib/types/types';

interface Props {
  recipes: SimilarRecipe[] | null;
}

export default function SimilarRecipesList({ recipes = null }: Props) {
  if (!recipes || recipes.length === 0) {
    return null;
  }

  return (
    <section>
      <h2>Similar Recipes</h2>
      <ul>
        {recipes?.map((item, index) => (
          <li key={`${item.id}-${index}`}>
            <Link href={`/recipe?id=${item.id}`}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
