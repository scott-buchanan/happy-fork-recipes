'use client';

import Link from 'next/link';
import Image from 'next/image';
import PageTemplate from '../components/pageTemplate';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axios, { AxiosResponse } from 'axios';
import { Recipe } from '../types/types';
import { Badge } from '@mantine/core';
import { capitalize } from '../utils/utils';
import Img from '../components/Img';

// Recipe details page
export default function RecipeDetails() {
  const searchParams = useSearchParams();
  const recipeId: number | null = searchParams.get('id')
    ? parseInt(searchParams.get('id')!, 10)
    : null;
  const [error, setError] = useState<string | null>(null);
  const [recipeData, setRecipeData] = useState<Recipe | null>(null);

  useEffect(() => {
    const getRecipe = async (id: number) => {
      const recipeDetails: { recipes: Recipe[] } = JSON.parse(
        localStorage.getItem('recipeDetails') || '{ "recipes": [] }',
      );

      // if recipe exists in localStorage, return recipe
      if (recipeDetails.recipes.length > 0) {
        const cachedRecipe: Recipe | undefined = recipeDetails.recipes.find(
          (recipe: Recipe) => recipe.id === recipeId,
        );
        if (cachedRecipe) {
          console.log(cachedRecipe);
          setRecipeData(cachedRecipe);
          return;
        }
      }

      console.log(process.env.NEXT_PUBLIC_API_KEY);
      const response: AxiosResponse | null = await axios
        .get(`https://api.spoonacular.com/recipes/${id}/information`, {
          params: { apiKey: process.env.NEXT_PUBLIC_API_KEY },
        })
        .catch((error) => {
          setError(`Error getting recipe information: ${error}.`);
          return null;
        });

      if (response) {
        if (response.status !== 200) {
          setError(`Error getting recipe information: ${response.statusText}.`);
        } else {
          setRecipeData(response.data);
          if (response.data.id) recipeDetails.recipes.push(response.data);
          localStorage.setItem('recipeDetails', JSON.stringify(recipeDetails));
        }
      }
    };

    // Check for recipe id and set error if none
    if (!recipeId) {
      setError('Please select a recipe.');
    } else {
      getRecipe(recipeId);
    }
  }, [recipeId]);

  return (
    <PageTemplate>
      {/* Display an error if no recipe id or invalid id */}
      {error && (
        <div>
          {error} <Link href="/">Go Home</Link> to select a featured recipe or search in the box
          above.
        </div>
      )}

      {/* Display recipe */}
      {recipeData && (
        <>
          <div className="flex items-start gap-5">
            <div>
              <div className="mb-5 flex rounded-3xl border border-gray-300 bg-white">
                <div className="flex-grow p-5">
                  <h1 className="m-0 mr-3">{recipeData.title}</h1>
                  {recipeData.diets.map((item) => (
                    <Badge
                      className="mr-1 inline-block last:mr-0"
                      key={item}
                      size="sm"
                      color="orange"
                    >{`${item.slice(0, 1).toUpperCase()}${item.slice(1)}`}</Badge>
                  ))}
                </div>
                <Img
                  imageUrl={recipeData.image}
                  className="rounded-r-3xl"
                  description={`A picture of ${recipeData.title}`}
                  width={500}
                  height={500}
                />
              </div>

              <article className="mb-3 flex-grow rounded-3xl border border-gray-300 bg-white p-5">
                <h2>Instructions</h2>
                {recipeData.analyzedInstructions.map((item, index) => {
                  return (
                    <>
                      {item.name && <h3 className="ml-5">{item.name}</h3>}
                      <ol key={index}>
                        {item.steps.map((step) => (
                          <li key={step.number} className="mb-3">
                            {step.step}
                          </li>
                        ))}
                      </ol>
                    </>
                  );
                })}
              </article>
            </div>

            <aside className="w-1/2 rounded-3xl border border-gray-300 bg-white p-5">
              <h2>Ingredients</h2>
              <ul>
                {recipeData.extendedIngredients?.map((ingredient) => (
                  <li key={ingredient.id}>
                    {`${ingredient.amount} ${capitalize(ingredient.nameClean)}`}
                    {JSON.stringify(ingredient)}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </>
      )}
    </PageTemplate>
  );
}
