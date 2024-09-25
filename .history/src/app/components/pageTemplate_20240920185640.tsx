import Image from "next/image";
import logo from '@/assets/logo.png';
import Link from 'next/link'

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
    </>
  );
}
