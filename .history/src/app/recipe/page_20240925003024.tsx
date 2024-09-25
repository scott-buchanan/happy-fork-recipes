'use client';

import Link from 'next/link';
import Image from 'next/image';
import { PageTemplate } from '../components/pageTemplate';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axios, { AxiosResponse } from 'axios';
import { Recipe } from '../types/types';
import { Badge } from '@mantine/core';
import { capitalize } from '../utils/utils';
import Fraction from 'fraction.js';
import Img from '../components/Img';
import SimilarRecipesList from '../components/SimilarRecipes';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Tooltip } from '@mantine/core';

// Recipe details page
export default function RecipeDetails() {
  const searchParams = useSearchParams();
  const recipeId: number | null = searchParams.get('id')
    ? parseInt(searchParams.get('id')!, 10)
    : null;
  const [error, setError] = useState<string | null>(null);
  const [recipeData, setRecipeData] = useState<Recipe | null>(null);

  // Get recipe
  useEffect(() => {
    console.log('useEffect triggered');

    // if recipe exists in localStorage, return recipe
    const getCachedRecipe = (id: number) => {
      const cachedRecipes: { recipes: Recipe[] } = JSON.parse(
        localStorage.getItem('recipes') || '{ "recipes": [] }',
      );

      if (cachedRecipes.recipes.length > 0) {
        const cachedRecipe: Recipe | undefined = cachedRecipes.recipes.find(
          (recipe: Recipe) => recipe.id === id,
        );
        if (cachedRecipe) {
          return cachedRecipe;
        }
      }
      return null;
    };

    // get recipe from API
    const getRecipe = async (id: number) => {
      if (id) {
        // If recipe is cached, return cached data
        const cached = getCachedRecipe(id);
        if (cached) {
          console.log('cached recipe: ', cached);
          setRecipeData(cached);
          return;
        }

        // API call
        const response: AxiosResponse | null = await axios
          .get(`https://api.spoonacular.com/recipes/${id}/information`, {
            params: { apiKey: process.env.NEXT_PUBLIC_API_KEY },
          })
          .catch((error) => {
            // Set error message for display is API call fails
            setError(`Error getting recipe information: ${error}.`);
            return null;
          });

        if (response) {
          if (response.status !== 200) {
            // Set error message if API returns a non 200 response code.
            setError(`Error getting recipe information: ${response.statusText}.`);
          } else {
            // Set recipe data if response was good.
            setRecipeData(response.data);

            // Load cached recipes from localStorage
            const cachedRecipes: { recipes: Recipe[] } = JSON.parse(
              localStorage.getItem('recipes') || '{ "recipes": [] }',
            );
            // Push to array adding new recipe entry
            cachedRecipes.recipes.push(response.data);
            localStorage.setItem('recipes', JSON.stringify(cachedRecipes));
          }
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

  if (error) {
    // Display an error if no recipe id or invalid id
    return (
      <div>
        {error} <Link href="/">Go Home</Link> to select a featured recipe or search in the box
        above.
      </div>
    );
  }

  return (
    <PageTemplate>
      {/* Display recipe */}
      {recipeData && (
        <div className="flex items-start gap-16 p-5">
          <article className="mb-3 flex-grow">
            <span className="flex">
              <h1 className="m-0 mr-3">{recipeData.title}</h1>
              {recipeData.veryHealthy && (
                <Tooltip label="Very healthy recipe!" className="!text-xs">
                  <Icon
                    className="text-3xl text-red-600"
                    icon="icon-park-solid:healthy-recognition"
                  />
                </Tooltip>
              )}
            </span>

            {recipeData.diets.map((item) => (
              <Badge
                className="my-3 mr-2 inline-block last:mr-0"
                key={item}
                size="sm"
                color="orange"
              >
                {item}
              </Badge>
            ))}

            <p dangerouslySetInnerHTML={{ __html: recipeData.summary }} />

            <hr className="my-6" />

            <h2 className="mt-5">Instructions</h2>
            {recipeData.analyzedInstructions.length > 0 ? (
              recipeData.analyzedInstructions.map((item, index) => {
                return (
                  <div key={index}>
                    {item.name && <h3 className="ml-5">{item.name}</h3>}
                    <ol>
                      {item.steps.map((step) => (
                        <li key={step.number} className="last-of-type:mb-0">
                          {step.step}
                        </li>
                      ))}
                    </ol>
                  </div>
                );
              })
            ) : (
              <div dangerouslySetInnerHTML={{ __html: recipeData.instructions }} />
            )}

            <hr className="my-6" />

            <SimilarRecipesList recipeId={recipeData.id} />
          </article>

          <aside className="w-1/2 min-w-96 overflow-hidden rounded-3xl border border-gray-300 bg-white">
            <Img
              imageUrl={recipeData.image}
              className=""
              description={`A picture of ${recipeData.title}`}
              width={500}
              height={500}
            >
              <div className="flex w-full justify-between bg-black/50 px-20 py-3 text-white">
                <div className="flex items-center">
                  <Icon icon="ph:fork-knife-duotone" className="px-2 text-3xl" />{' '}
                  {recipeData.readyInMinutes} minutes
                </div>
                <div className="flex items-center">
                  <Icon icon="ph:fork-knife-duotone" className="px-5" /> {recipeData.servings}
                </div>
              </div>
            </Img>
            <div className="p-5">
              <h2>Ingredients</h2>
              <ul>
                {recipeData.extendedIngredients?.map((ingredient, index) => (
                  <li key={index} className="last-of-type:mb-0">
                    {`${new Fraction(ingredient.amount).toFraction()} ${ingredient.unit} ${capitalize(ingredient.nameClean)}`}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      )}
    </PageTemplate>
  );
}
