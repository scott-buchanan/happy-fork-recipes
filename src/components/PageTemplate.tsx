import Link from 'next/link';
import { TextInput, ActionIcon, Select } from '@mantine/core';
import { Icon } from '@iconify/react';
import { cuisines } from '../lib/constants/constants';
import background from '/public/images/background.jpg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useGlobalContext } from '../context/GlobalContext';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export const PageTemplate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [localQuery, setLocalQuery] = useState<string>(searchParams.get('q') || '');
  const [localCuisine, setLocalCuisine] = useState<string>(searchParams.get('cuisine') || '');

  function performSearch(): void {
    const queryParams: Record<string, string> = {};

    if (localQuery) {
      queryParams.q = localQuery;
    }
    if (localCuisine) {
      queryParams.cuisine = localCuisine;
    }

    // Check if any query parameters exist
    const queryString = new URLSearchParams(queryParams).toString();

    // Conditionally navigate based on whether queryString exists
    const url = queryString ? `/search?${queryString}` : '/search';

    router.push(url);
  }

  function handleKeyDownSearch(e: React.KeyboardEvent<HTMLInputElement>): void {
    if (e.key === 'Enter') {
      performSearch();
      return;
    }
    if (e.key === 'Backspace') {
      setLocalQuery('');
    }
  }

  function handleSearchClick(): void {
    performSearch();
  }

  return (
    <>
      <header className="relative">
        <Image
          src={background}
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: 'cover' }}
          quality={100}
          placeholder="blur"
          className="static -z-10"
        />
        <div className="container mx-auto px-5 py-10">
          <nav>
            <Link href="/" className="relative mb-3 inline-block w-48 md:w-80">
              <Image src="/images/logo.png" alt="Happy Fork Recipes" width={320} height={320} />
            </Link>
          </nav>
          <div className="w-full gap-5 py-4 sm:flex">
            <Select
              size="md"
              radius="xl"
              placeholder="Select a cuisine"
              className="mb-3 sm:mb-0"
              data={cuisines.map((item) => item.name)}
              clearable
              value={localCuisine}
              onChange={(_value, option) => setLocalCuisine(option?.value || '')}
              leftSection={
                <Icon
                  fontSize={20}
                  className="ms-1"
                  icon={
                    cuisines.find((item) => item.name === localCuisine)?.icon ||
                    'mdi:cursor-default'
                  }
                />
              }
            />
            <TextInput
              radius="xl"
              size="md"
              placeholder="Search for recipes"
              className="flex-grow"
              onKeyDown={handleKeyDownSearch}
              onChange={(e) => setLocalQuery(e.currentTarget.value || '')}
              defaultValue={localQuery}
              rightSection={
                <ActionIcon
                  size={32}
                  radius="xl"
                  variant="filled"
                  className="!bg-secondary"
                  aria-label="Search"
                  onClick={handleSearchClick}
                >
                  <Icon icon="bi:search" />
                </ActionIcon>
              }
            />
          </div>
        </div>
      </header>
      <main className="container mx-auto mt-5 flex-grow px-5">{children}</main>
      <footer className="bg-slate-700 p-3 text-center text-white">
        <p className="mb-2 text-sm">
          Built with{' '}
          <a
            href="https://nextjs.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-white no-underline hover:text-white hover:underline"
          >
            Next.js
          </a>{' '}
          and{' '}
          <a
            href="https://www.typescriptlang.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-white no-underline hover:text-white hover:underline"
          >
            TypeScript
          </a>
          , styled using{' '}
          <a
            href="https://tailwindcss.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-white no-underline hover:text-white hover:underline"
          >
            Tailwind CSS
          </a>
          , deployed on{' '}
          <a
            href="https://vercel.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-white no-underline hover:text-white hover:underline"
          >
            Vercel
          </a>
          , and powered by the{' '}
          <a
            href="https://spoonacular.com/food-api"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-white no-underline hover:text-white hover:underline"
          >
            Spoonacular API
          </a>
          .
        </p>
        <p className="text-xs">
          &#169; {new Date().getFullYear()} Happy Fork Recipes. A website by{' '}
          <a
            href="https://scottbuchanan.ca/"
            className="font-bold text-white no-underline hover:text-white hover:underline focus-visible:underline"
          >
            Scott Buchanan
          </a>
          .
        </p>
      </footer>
    </>
  );
};
