'use client'

import { useEffect, useState } from "react";
import PageTemplate from "./components/pageTemplate";
import Link from "next/link";
import axios from 'axios';

export default function Home() {

  const [randopes, setRandopes] = useState(null)

        // Fetch random recipes on load
  useEffect(() => {
    async function fetchRandos() {
      let randos = JSON.parse(localStorage.getItem('randos') || '{}');

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
    console.log(randopes)
  }, [])

  return (
    <PageTemplate>
      <h1>Home page</h1>
      <Link href="/recipe">Go to recipe</Link>

      {JSON.stringify(randopes)}
    </PageTemplate>
  );
}
