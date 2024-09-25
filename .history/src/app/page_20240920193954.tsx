import { useEffect } from "react";
import PageTemplate from "./components/pageTemplate";
import Link from "next/link";
import axios from 'axios';

export default function Home() {
  useEffect(async () => {
// Fetch random recipes on load
const randos = await axios.get('https://api.spoonacular.com/recipes/random?number=5')
  }, [])

  return (
    <PageTemplate>
      <h1>Home page</h1>
      <Link href="/recipe">Go to recipe</Link>
    </PageTemplate>
  );
}
