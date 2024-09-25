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
      <p className="mb-8 mt-5 text-lg">
        Welcome to Happy Fork Recipes, where good food meets good times! Hungry for something
        delicious? We’ve got your back. From <b>comforting classics</b> to{' '}
        <b>fresh new favorites</b>, or from <b>quick weeknight dinners</b> to{' '}
        <b>delightful desserts</b>, we’re here to help you whip up something amazing. You’ll find
        inspiration for every craving! So, grab a fork, check out our delicious recipes, and{' '}
        <i>make a meal tonight!</i>
      </p>
      <h2 className="mb-6 mt-3">Featured Recipes</h2>
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
