import Image from "next/image";
import Link from 'next/link'
import { Button, TextInput, ActionIcon } from "@mantine/core";
import { Icon } from '@iconify/react';

import logo from '@/assets/logo.png';

export default function PageTemplate({
    children
  }: {
    children: React.ReactNode
  })  {

  return (
    <>
      <header className="container mx-auto mt-5">
        <nav className="text-center">
            <Link href="/" className="inline-block">
            <Image src={logo} alt="Happy Fork Recipes"/>
            </Link>
        </nav>
      </header>
      <main className="container mx-auto flex-grow" >
        <TextInput
            radius="xl"
            size="md"
            placeholder="Beef stew"
            className="py-5"
            rightSection={<ActionIcon size={32} radius="xl" variant="filled">
                            <Icon icon="bi:search" />
                        </ActionIcon>
                        }
        />
        {children}
      </main>
      <footer className="text-center p-3 bg-slate-700 text-white">
        <div className="text-sm mb-2">Built with <b>Next.js</b>, styled with <b>Tailwind CSS</b>, powered by <b>TypeScript</b>, and deployed on <b>Vercel</b>.</div>
        <div className="text-xs">&#169; {new Date().getFullYear()} Happy Fork Recipes</div>
      </footer>
    </>
  );
}
