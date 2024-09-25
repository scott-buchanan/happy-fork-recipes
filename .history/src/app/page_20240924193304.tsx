'use client';

import { useEffect, useState } from 'react';
import { PageTemplate } from './components/pageTemplate';
import { RecipeCard } from './components/RecipeCard';
import axios, { AxiosResponse } from 'axios';
import type { Recipes, Recipe } from './types/types';

export default function Home() {
  const [randopes, setRandopes] = useState<Recipes>({} as Recipes);

  // Fetch random recipes on load
  useEffect(() => {
    async function fetchRandos() {
      let randos: AxiosResponse = JSON.parse(localStorage.getItem('randos') || '{}');

      if (Object.keys(randos).length === 0) {
        randos = await axios.get('https://api.spoonacular.com/recipes/random?number=6', {
          params: { apiKey: '7dbd77ed3f204e75b312542b8e246dae' },
        });
        localStorage.setItem('randos', JSON.stringify(randos.data));
        return randos.data;
      } else {
        return randos;
      }
    }

    fetchRandos().then((res) => setRandopes(res));
  }, []);

  return (
    <PageTemplate>
      <p className="mb-8 mt-5 text-xl">
        Welcome to Happy Fork Recipes, where good food meets good times! Hungry for something
        delicious? At Happy Fork Recipes, we&apos;ve got your back. From comforting classics to
        fresh new favorites, we&apos;re here to help you whip up something amazing. From quick
        weeknight dinners to delightful desserts, you&apos;ll find inspiration for every craving.
        So, grab a fork, check out our delicious recipes, and make a meal tonight!
      </p>
      <h1 className="mb-6 mt-3">Featured Recipes</h1>
      {randopes.recipes && (
        <>
          <hr className="my-6" />
          <div className="gap-5 sm:columns-1 md:columns-3">
            {randopes.recipes?.map((item: Recipe) => <RecipeCard key={item.id} recipe={item} />)}
          </div>
        </>
      )}
    </PageTemplate>
  );
}
