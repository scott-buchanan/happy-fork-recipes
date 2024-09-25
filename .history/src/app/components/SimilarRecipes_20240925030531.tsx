import Link from 'next/link';
import { SimilarRecipes } from '../types/types';
import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';

interface Props {
  recipeId: number;
}

export default function SimilarRecipesList({ recipeId }: Props) {
  const [similarRecipes, setSimilarRecipes] = useState<SimilarRecipes | null>(null);
  const [error, setError] = useState<string | null>(null);

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

    // get similar recipes from API
    const getSimilarRecipes = async (id: number) => {
      if (id) {
        // If recipe is cached, return cached data
        const cached = getCachedSimilarRecipes(id);
        if (cached) {
          console.log(cached);
          setSimilarRecipes(cached);
          return;
        }

        // API call
        const response: AxiosResponse | null = await axios
          .get(`https://api.spoonacular.com/recipes/${id}/similar?number=5`, {
            params: { apiKey: process.env.NEXT_PUBLIC_API_KEY },
          })
          .catch((error) => {
            // Set error message for display is API call fails
            setError(`Error getting similar recipes: ${error}.`);
            return null;
          });

        if (response) {
          if (response.status !== 200) {
            // Set error message if API returns a non 200 response code.
            setError(`Error getting similar recipes: ${response.statusText}.`);
          } else {
            // Load cached recipes from localStorage
            const cachedSimilarRecipes: { similarRecipes: SimilarRecipes[] } = JSON.parse(
              localStorage.getItem('similarRecipes') || '{ "similarRecipes": [] }',
            );
            // Push to array adding new recipe entry
            cachedSimilarRecipes.similarRecipes.push({
              recipeId: recipeId,
              similarRecipes: response.data,
            });
            localStorage.setItem('similarRecipes', JSON.stringify(cachedSimilarRecipes));

            setSimilarRecipes({
              recipeId: recipeId,
              similarRecipes: response.data,
            });
          }
        }
      }
    };

    getSimilarRecipes(recipeId);
  }, [recipeId]);

  if (!similarRecipes) return null;

  return (
    <>
      <h2 className="mt-5">Similar Recipes</h2>
      <ul>
        {similarRecipes.similarRecipes &&
          similarRecipes.similarRecipes.map((item, index) => (
            <li key={index}>
              <Link href={`/recipe?id=${item.id}`}>{item.title}</Link>
            </li>
          ))}
      </ul>
    </>
  );
}
