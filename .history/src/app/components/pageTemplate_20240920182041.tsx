import Image from "next/image";
import logo from '@/assets/logo.png';
import Link from 'next/link'

export default function PageTemplate() {
  return (
    <>
      <header className="container mx-auto bg-slate-400">
        <nav>
            <Link href="/">
            <Image src={logo} alt="Happy Fork Recipes"/>
            </Link>
        </nav>
      </header>
      <main className="container mx-auto">
        <h1>Stuff</h1>
      </main>
    </>
  );
}
