import Link from 'next/link';
import { SimilarRecipes } from '../types/types';
import { useEffect } from 'react';

interface Props {
    recipes: SimilarRecipes
}

export default function SimilarRecipesList({ recipes }: Props) {

    useEffect(() => {

        // if recipe exists in localStorage, return similar recipe
        const getCachedSimilarRecipes = (id: number) => {
            const cachedRecipes: { similarRecipes: SimilarRecipes[] } = JSON.parse(
              localStorage.getItem('similarRecipes') || '{ "similarRecipes": [] }',
            );
      
            if (cachedRecipes.similarRecipes.length > 0) {
              const cachedRecipe: SimilarRecipes | undefined = cachedRecipes.similarRecipes.find(
                (recipe: SimilarRecipes) => recipe.recipeId === id,
              );
              if (cachedRecipe) {
                console.log(cachedRecipe);
                return cachedRecipe;
              }
            }
            return null;
          };

}, [recipes])

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
