import Image from "next/image";
import Link from 'next/link'

import logo from '@/assets/logo.png';

export default function PageTemplate({
    children
  }: {
    children: React.ReactNode
  })  {
  return (
    <>
      <header className="container mx-auto">
        <nav>
            <Link href="/">
            <Image src={logo} alt="Happy Fork Recipes"/>
            </Link>
        </nav>
      </header>
      <main className="container mx-auto flex-grow" >
        {children}
      </main>
      <footer className="text-center text-sm p-5">
      &#169; {new Date().getFullYear()} Scott Buchanan
      </footer>
    </>
  );
}
