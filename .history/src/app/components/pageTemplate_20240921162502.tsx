import Image from 'next/image';
import Link from 'next/link';
import { TextInput, ActionIcon, MultiSelect } from '@mantine/core';
import { Icon } from '@iconify/react';
import { cuisines } from '../constants/constants';
import logo from '@/assets/logo.png';

export default function PageTemplate({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="container mx-auto mt-5">
        <nav className="text-center">
          <Link href="/" className="inline-block">
            <Image src={logo} alt="Happy Fork Recipes" />
          </Link>
        </nav>
      </header>
      <main className="container mx-auto flex-grow">
        <div className="flex w-full py-5">
          <TextInput
            radius="xl"
            size="md"
            placeholder="Search for recipes"
            className="flex-grow"
            rightSection={
              <ActionIcon size={32} radius="xl" variant="filled">
                <Icon icon="bi:search" />
              </ActionIcon>
            }
          />
          <MultiSelect placeholder="Select a cuisine" data={cuisines} />
        </div>

        {children}
      </main>
      <footer className="bg-slate-700 p-3 text-center text-white">
        <div className="mb-2 text-sm">
          Built with <b>Next.js</b>, styled with <b>Tailwind CSS</b>, powered by <b>TypeScript</b>,
          and deployed on <b>Vercel</b>.
        </div>
        <div className="text-xs">&#169; {new Date().getFullYear()} Happy Fork Recipes</div>
      </footer>
    </>
  );
}
