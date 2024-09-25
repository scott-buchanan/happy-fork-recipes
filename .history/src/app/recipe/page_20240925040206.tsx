'use client';

import Link from 'next/link';
import { PageTemplate } from '../components/pageTemplate';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Recipe } from '../types/types';
import { Badge } from '@mantine/core';
import { capitalize } from '../utils/utils';
import Fraction from 'fraction.js';
import Img from '../components/Img';
import SimilarRecipesList from '../components/SimilarRecipes';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Tooltip } from '@mantine/core';
import { getRecipe } from '../api/calls';

// Recipe details page
export default function RecipeDetails() {
  const searchParams = useSearchParams();
  const recipeId: number | null = searchParams.get('id')
    ? parseInt(searchParams.get('id')!, 10)
    : null;
  const [error, setError] = useState<string | null>(null);
  const [recipeData, setRecipeData] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(false);

  // Get recipe
  useEffect(() => {
    const fetchRecipe = async (id: number) => {
      try {
        setLoading(true);
        const recipeData = await getRecipe(id);
        setRecipeData(recipeData);
        setLoading(false);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Check for recipe id and set error if none
    if (!recipeId) {
      setError('Please select a recipe.');
    } else {
      fetchRecipe(recipeId);
    }
  }, [recipeId]);

  if (loading) {
    return (
      <PageTemplate>
        <div className="mt-10 flex w-full justify-center">
          <Icon icon="line-md:loading-twotone-loop" className="text-[5rem] text-secondary" />
        </div>
      </PageTemplate>
    );
  }

  if (error) {
    // Display an error if no recipe id or invalid id
    return (
      <PageTemplate>
        <p className="mt-3 text-center">
          {error} <br />
          Go <Link href="/">Home</Link> to select a featured recipe or search in the box above.
        </p>
      </PageTemplate>
    );
  }

  return (
    <PageTemplate>
      {/* Display recipe */}
      {recipeData && (
        <div className="flex items-start gap-16 p-5">
          <article className="mb-3 flex-grow">
            <span className="flex">
              <h1 className="mr-3">{recipeData.title}</h1>
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
              <Badge className="mb-5 mr-2 inline-block !bg-black last:mr-0" key={item} size="sm">
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

          <aside className="min-w-96 overflow-hidden rounded-lg bg-white shadow-sm">
            <Img
              imageUrl={recipeData.image}
              description={`A picture of ${recipeData.title}`}
              width={500}
              height={500}
            >
              <div className="columns-2 bg-black/50 px-5 py-3 text-white">
                <div className="flex items-center">
                  <Icon icon="mdi:clock-outline" className="mr-3 text-3xl" />
                  <span className="text-sm">{recipeData.readyInMinutes} minutes</span>
                </div>
                <div className="flex items-center">
                  <Icon icon="ph:fork-knife" className="mr-3 text-3xl" />
                  <span className="text-sm">Serves {recipeData.servings}</span>
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
