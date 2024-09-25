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
        randos = await axios.get('https://api.spoonacular.com/recipes/random?number=5', { params: { apiKey : '7dbd77ed3f204e75b312542b8e246dae' }});
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
      <h1>Home page</h1>
      <Link href="/recipe">Go to recipe</Link>

      <div className="flex gap-5 w-full">
        {randopes?.recipes?.map((item: Recipe) => {
          console.log(Object.entries(item))
          return (
            <div key={item.id} className="border rounded-lg bg-slate-300 h-96 w-1/2">
              <Image src={item.image} alt={item.title} width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }} />
              
            </div>
          )
        })}
      </div>
    </PageTemplate>
  );
}
