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
              <div className="flex rounded-lg border border-gray-300 bg-white">
                <div className="flex-grow">
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
                  className="rounded-r-lg"
                  description={`A picture of ${recipeData.title}`}
                  width={500}
                  height={500}
                />
              </div>

              <article className="mb-3 flex-grow rounded-lg border border-gray-300 bg-white p-3">
                <h2>Instructions</h2>
                <ol>
                  {recipeData.analyzedInstructions.map((item) => {
                    return item.steps.map((step) => (
                      <li key={step.number}>
                        {step.step}

                        {step.equipment.map((equ) => (
                          <Img
                            imageUrl={equ.image}
                            description={equ.name}
                            key={equ.id}
                            width={200}
                            height={200}
                          />
                        ))}
                      </li>
                    ));
                  })}
                </ol>
              </article>
            </div>

            <aside className="w-3/4 rounded-lg border border-gray-300 bg-white p-3">
              <h2>Ingredients</h2>
              <ul>
                {recipeData.extendedIngredients?.map((ingredient) => (
                  <li key={ingredient.id}>{capitalize(ingredient.nameClean)}</li>
                ))}
              </ul>
            </aside>
          </div>
        </>
      )}
    </PageTemplate>
  );
}
