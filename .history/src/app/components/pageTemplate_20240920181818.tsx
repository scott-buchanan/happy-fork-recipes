import Image from "next/image";
import logo from '@/assets/logo.png';
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <header class="container mx-auto">
<nav>
    <Link href="/home">
    <Image src={logo} alt="Happy Fork Recipes"/>
    </Link>
</nav>
      </header>
    </>
  );
}
