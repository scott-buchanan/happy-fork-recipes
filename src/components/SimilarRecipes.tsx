import Link from 'next/link';
import { SimilarRecipes } from '../types/types';

interface Props {
  recipes: SimilarRecipes;
}

export default function SimilarRecipesList({ recipes }: Props) {
  if (!recipes) return null;

  return (
    <ul>
      {recipes.similarRecipes &&
        recipes.similarRecipes.map((item, index) => (
          <li key={index}>
            <Link href={`/recipe?id=${item.id}`}>{item.title}</Link>
          </li>
        ))}
    </ul>
  );
}
