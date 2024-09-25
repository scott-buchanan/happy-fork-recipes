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
      <h1 className="mb-6 mt-3">Featured Recipes</h1>
      {randopes.recipes && (
        <>
          <p>
            Welcome to Happy Fork Recipes, where good food meets good times! Hungry for something
            delicious? At Happy Fork Recipes, we've got your back. From comforting classics to fresh
            new favorites, we’re here to help you whip up something amazing. So roll up your
            sleeves, grab your favorite fork, and let’s get cooking—tonight’s meal is about to be a
            hit!
          </p>
          <hr className="my-6" />
          <div className="gap-5 sm:columns-1 md:columns-3">
            {randopes.recipes?.map((item: Recipe) => <RecipeCard key={item.id} recipe={item} />)}
          </div>
        </>
      )}
    </PageTemplate>
  );
}
