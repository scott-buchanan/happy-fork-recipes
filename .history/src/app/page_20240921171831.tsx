'use client';

import { useEffect, useState } from 'react';
import PageTemplate from './components/pageTemplate';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@mantine/core';
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
      <h1>Featured Recipes</h1>
      {randopes.recipes && (
        <>
          <hr className="mb-5" />
          <div className="gap-5 sm:columns-1 md:columns-3">
            {randopes.recipes?.map((item: Recipe) => (
              <Link
                href={{ pathname: '/recipe', query: { id: item.id } }}
                key={item.id}
                className="relative mb-5 block h-auto w-full overflow-hidden rounded-2xl border border-gray-400 shadow-xl"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: '100%', height: 'auto' }}
                />
                <div className="absolute top-0 w-full overflow-hidden text-ellipsis whitespace-nowrap bg-gradient-to-b from-black to-transparent p-4 pb-14 text-lg font-bold text-white">
                  {item.title}
                </div>
                <div className="absolute bottom-0 w-full p-3 text-right">
                  {item.diets
                    ?.slice(0, 3)
                    .map((item) => (
                      <Badge
                        className="mr-1 inline-block last:mr-0"
                        key={item}
                        size="sm"
                        color="orange"
                      >{`${item.slice(0, 1).toUpperCase()}${item.slice(1)}`}</Badge>
                    ))}
                </div>
              </Link>
            ))}
          </div>
          <hr />
        </>
      )}
    </PageTemplate>
  );
}
