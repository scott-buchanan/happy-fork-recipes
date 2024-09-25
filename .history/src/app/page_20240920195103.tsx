'use client'

import { useEffect, useState } from "react";
import PageTemplate from "./components/pageTemplate";
import Link from "next/link";
import axios from 'axios';

export default function Home() {
  const [randopes, setRandopes] = useState(null)
  useEffect(() => {
    async function fetchRandos() {
      // Fetch random recipes on load
      return await axios.get('https://api.spoonacular.com/recipes/random?number=5', { headers: { apiKey : '7dbd77ed3f204e75b312542b8e246dae' }})
    }

    setRandopes(fetchRandos());
    console.log(randopes)
  }, [])

  return (
    <PageTemplate>
      <h1>Home page</h1>
      <Link href="/recipe">Go to recipe</Link>

      {randopes}
    </PageTemplate>
  );
}
