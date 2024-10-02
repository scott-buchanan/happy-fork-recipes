'use client';

import Link from 'next/link';
import { PageTemplate } from '../../components/PageTemplate';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Recipe, SimilarRecipes } from '../../lib/types/types';
import { Badge } from '@mantine/core';
import { capitalize } from '../../lib/utils/utils';
import Img from '../../components/ImgBlur';
import SimilarRecipesList from '../../components/SimilarRecipes';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Tooltip, SegmentedControl } from '@mantine/core';
import { getRecipe, getSimilarRecipes } from '../../lib/api/calls';
import { useGlobalContext } from '../../context/GlobalContext';
import { roundToTenth } from '../../lib/utils/utils';
import { Loader } from '../../components/Loader';

// Recipe details page
export default function RecipeDetails() {
  const searchParams = useSearchParams();
  const recipeId: number | null = searchParams.get('id')
    ? parseInt(searchParams.get('id')!, 10)
    : null;
  const [error, setError] = useState<string | null>(null);
  const [recipeData, setRecipeData] = useState<{ recipe: Recipe | null; error?: string } | null>(
    null,
  );
  const [similarRecipes, setSimilarRecipes] = useState<{
    similarRecipes: SimilarRecipes | null;
    error?: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const { metric, setMetric } = useGlobalContext();

  // Get data on load
  useEffect(() => {
    const getPageData = async (id: number) => {
      try {
        setLoading(true);

        const [recipeData, similarRecipes]: [
          { recipe: Recipe | null; error?: string },
          { similarRecipes: SimilarRecipes | null; error?: string },
        ] = await Promise.all([getRecipe(id), getSimilarRecipes(id)]);

        setRecipeData(recipeData);
        setSimilarRecipes(similarRecipes);

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
      getPageData(recipeId);
    }
  }, [recipeId]);

  if (loading) {
    return (
      <PageTemplate>
        <Loader />
      </PageTemplate>
    );
  }

  // if (error) {
  //   // Display an error if no recipe id or invalid id
  //   return (
  //     <PageTemplate>
  //       <p className="mt-3 text-center">
  //         {error} <br />
  //         Go <Link href="/">Home</Link> to select a featured recipe or search in the box above.
  //       </p>
  //     </PageTemplate>
  //   );
  // }

  const RecipeInfo = () => {
    if (recipeData?.recipe) {
      return (
        <div>
          <span className="flex">
            <h1 className="mr-3">{recipeData.recipe.title}</h1>
            {recipeData.recipe.veryHealthy && (
              <Tooltip label="Very healthy recipe!" className="!text-xs">
                <Icon className="-mt-2 text-4xl text-red-600" icon="solar:health-bold-duotone" />
              </Tooltip>
            )}
          </span>

          {recipeData.recipe.diets.map((item) => (
            <Badge className="mb-2 mr-2 inline-block !bg-slate-800 last:mr-0" key={item} size="sm">
              {item}
            </Badge>
          ))}

          <p className="mt-3" dangerouslySetInnerHTML={{ __html: recipeData.recipe.summary }} />

          <h2 className="mt-8">Instructions</h2>
          {recipeData.recipe.analyzedInstructions.length > 0 ? (
            recipeData.recipe.analyzedInstructions.map((item, index) => {
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
            <div dangerouslySetInnerHTML={{ __html: recipeData.recipe.instructions }} />
          )}
        </div>
      );
    }
  };

  const Ingredients = () => {
    if (recipeData?.recipe) {
      return (
        <aside className="lg:min-w-96">
          <div className="overflow-hidden rounded-lg bg-white shadow-sm">
            <Img
              src={recipeData.recipe.image}
              description={`A picture of ${recipeData.recipe.title}`}
              width={recipeData.recipe.img.width}
              height={recipeData.recipe.img.height}
              dataUrl={recipeData.recipe.dataUrl}
              className="w-full"
            >
              <div className="flex flex-wrap justify-center gap-x-5 bg-black/50 px-5 pt-3 text-white">
                <div className="mb-3 flex items-center">
                  <Icon icon="mdi:clock-outline" className="mr-3 text-3xl" />
                  <span className="text-sm">{recipeData.recipe.readyInMinutes} minutes</span>
                </div>
                <div className="mb-3 flex items-center">
                  <Icon icon="ph:fork-knife" className="mr-3 text-3xl" />
                  <span className="text-sm">Serves {recipeData.recipe.servings}</span>
                </div>
              </div>
            </Img>
            <div className="p-5">
              <div className="mb-5 flex flex-wrap justify-between">
                <h2 className="mb-3">Ingredients</h2>
                <SegmentedControl
                  className="mb-3"
                  data={['Metric', 'Imperial']}
                  value={metric ? 'Metric' : 'Imperial'}
                  radius="xl"
                  onChange={() => setMetric(!metric)}
                />
              </div>

              <ul>
                {recipeData.recipe.extendedIngredients?.map((ingredient, index) => (
                  <li key={index}>
                    {`${metric ? roundToTenth(ingredient.measures.metric.amount) : ingredient.measures.us.amount} ${ingredient.measures[metric ? 'metric' : 'us'].unitShort} ${capitalize(ingredient.nameClean || ingredient.name)}`}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      );
    }
  };

  const SimilarRecipes = () => {
    if (similarRecipes?.similarRecipes) {
      return (
        <>
          <h2>Similar Recipes</h2>
          <SimilarRecipesList recipes={similarRecipes.similarRecipes} />
        </>
      );
    }
  };

  return (
    <PageTemplate>
      {/* display error if errors exist from API calls */}
      {error && <p className="mb-6 mt-3 text-center">{error}</p>}
      {!error && (
        <article className="flex">
          <div className="flex-grow">
            <div className="p-5">
              <RecipeInfo />
            </div>

            {/* Ingredients - small screens */}
            <div className="block p-5 lg:hidden">
              <Ingredients />
            </div>

            {/* Similar Recipes */}
            <div className="p-5">
              <SimilarRecipes />
            </div>
          </div>

          {/* Ingredients - right side large screens */}
          <div className="hidden p-5 lg:block">
            <Ingredients />
          </div>
        </article>
      )}
    </PageTemplate>
  );
}
