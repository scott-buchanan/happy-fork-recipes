import { useEffect } from "react";
import PageTemplate from "./components/pageTemplate";
import Link from "next/link";

useEffect(() => {

}, [])

export default function Home() {
  return (
    <PageTemplate>
      <h1>Home page</h1>
      <Link href="/recipe">Go to recipe</Link>
    </PageTemplate>
  );
}
