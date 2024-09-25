import Link from 'next/link';
import { SimilarRecipes as SimRecipes } from '../types/types';

interface Props {
    recipes: SimRecipes
}

export default function SimilarRecipes({ recipes }: Props) {
    return (
        {recipes?.similarRecipes.length > 0 ? (
            <>
              <h2 className="mt-5">Similar Recipes</h2>
              <ul>
                {recipes.similarRecipes &&
                    recipes.similarRecipes.map((item, index) => (
                    <li key={index}>
                      <Link href={`/recipe?id=${item.id}`}>{item.title}</Link>
                    </li>
                  ))}
              </ul>
            </>
          ) : null}
    )
}
