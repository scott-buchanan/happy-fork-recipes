'use client';

import { useEffect, useState } from 'react';
import { PageTemplate } from '../components/PageTemplate';
import { RecipeCard } from '../components/RecipeCard';
import { getFeaturedRecipes } from '../lib/api/calls';
import { Recipe } from '../lib/types/types';
import { Loader } from '../components/Loader';

export default function Home() {
  const [featuredRecipes, setFeaturedRecipes] = useState<Recipe[] | null>(null);
  const [loaded, setLoaded] = useState(false);

  // Fetch random recipes on load
  useEffect(() => {
    const getFromApi = async () => {
      const response: { recipes: Recipe[] | null; error?: string } = await getFeaturedRecipes();
      if (response.recipes && response.recipes.length > 0) {
        setFeaturedRecipes(response.recipes);
      }

      setLoaded(true);
    };

    getFromApi();
  }, []);

  return (
    <PageTemplate>
      {!loaded && <Loader />}
      {loaded && (
        <>
          <p className="mb-8 mt-5 text-lg">
            Welcome to Happy Fork Recipes, where good food meets good times! Hungry for something
            delicious? We&apos;ve got your back. From <b>comforting classics</b> to{' '}
            <b>fresh new favorites</b>, or from <b>quick weeknight dinners</b> to{' '}
            <b>delightful desserts</b>, we&apos;re here to help you whip up something amazing.
            You&apos;ll find inspiration for every craving! So, grab a fork, check out our delicious
            recipes, and <i>make a meal tonight!</i>
          </p>
          {featuredRecipes && (
            <>
              <hr className="my-6" />
              <h2 className="mb-6 mt-3">Featured Recipes</h2>
              <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {featuredRecipes.map((item: Recipe, index: number) => (
                  <RecipeCard key={index} recipe={item} />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </PageTemplate>
  );
}
