import Image from 'next/image';
import Link from 'next/link';
import { TextInput, ActionIcon, Select } from '@mantine/core';
import { Icon } from '@iconify/react';
import { cuisines } from '../constants/constants';
import logo from '@/assets/logo.png';
import { useState } from 'react';

export default function PageTemplate({ children }: { children: React.ReactNode }) {
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);

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
          <Select
            size="md"
            radius="xl"
            data={cuisines.map((item) => item.name)}
            leftSection={
              <Icon
                fontSize={24}
                icon={cuisines.find((item) => item.name === selectedCuisine)?.icon || ''}
              />
            }
            onChange={(val) => setSelectedCuisine(val)}
          />
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
