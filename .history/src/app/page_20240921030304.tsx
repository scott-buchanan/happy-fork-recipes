'use client'

import { useEffect, useState } from "react";
import PageTemplate from "./components/pageTemplate";
import Link from "next/link";
import Image from "next/image";
import axios, { AxiosResponse } from 'axios';

import type { Recipes, Recipe } from "./types/types";

export default function Home() {

  const [randopes, setRandopes] = useState<Recipes>({} as Recipes)

  // Fetch random recipes on load
  useEffect(() => {
    async function fetchRandos() {
      let randos: AxiosResponse = JSON.parse(localStorage.getItem('randos') || '{}');

      if (Object.keys(randos).length === 0) {
        randos = await axios.get('https://api.spoonacular.com/recipes/random?number=6', { params: { apiKey : '7dbd77ed3f204e75b312542b8e246dae' }});
        localStorage.setItem('randos', JSON.stringify(randos.data))
        return randos.data;
      }
      else {
        return randos;
      }
    }

    fetchRandos().then((res) => setRandopes(res))
  }, [])

  return (
    <PageTemplate>

      <h1>Featured Recipes</h1>
      <hr className="mb-5" />
      <div className="sm:columns-1 md:columns-3 gap-5">
        {randopes?.recipes?.map((item: Recipe) =>  (
            <Link href={{ pathname: "/recipe", query: { id: item.id } }} key={item.id} className="block border rounded-2xl bg-slate-300 h-auto w-full overflow-hidden relative mb-5">
              <Image src={item.image} alt={item.title} width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }} />
              <div className="absolute top-0 bg-gradient-to-b from-black to-transparent text-white p-4 pb-14 w-full font-bold text-lg whitespace-nowrap text-ellipsis overflow-hidden">
                {item.title}
              </div>
            </Link>
          )
        )}
      </div>
      <hr />
    </PageTemplate>
  );
}
