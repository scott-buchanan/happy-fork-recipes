import { useEffect } from "react";
import PageTemplate from "./components/pageTemplate";
import Link from "next/link";
import axios from 'axios';

export default function Home() {
  useEffect(() => {
    async function fetchRandos() {
// Fetch random recipes on load
return await axios.get('https://api.spoonacular.com/recipes/random?number=5', { headers: { api_key: 'ff38511a17d24039b9c23f5c71d8da91' }})
    }
  }, [])

  return (
    <PageTemplate>
      <h1>Home page</h1>
      <Link href="/recipe">Go to recipe</Link>
    </PageTemplate>
  );
}
