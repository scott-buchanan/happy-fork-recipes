import PageTemplate from "./components/pageTemplate";
import Link from "next/link";

export default function Home() {
  return (
    <PageTemplate>
      Home page
      <Link href="/recipe">Go to recipe</Link>
    </PageTemplate>
  );
}
