import Img from './Img';
import Link from 'next/link';
import { TextInput, ActionIcon, Select } from '@mantine/core';
import { Icon } from '@iconify/react';
import { cuisines } from '../constants/constants';
import logo from '@/assets/logo.png';
import { createContext, useState } from 'react';
import { BackgroundImage } from '@mantine/core';
import background from '@/assets/background.jpg';

export const LoadingContext = createContext(false);

export const PageTemplate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading] = useState<boolean>(false);
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);

  return (
    <>
      <header className="">
        <BackgroundImage src={background.src}>
          <div className="container mx-auto py-10">
            <nav>
              <Link href="/" className="mb-3 inline-block">
                <Img
                  imageUrl={logo.src}
                  description="Happy Fork Recipes"
                  width={300}
                  height={300}
                  className="xs:w-10 md:w-auto"
                />
              </Link>
            </nav>
            <div className="flex w-full gap-5 py-4">
              <Select
                size="md"
                radius="xl"
                placeholder="Select a cuisine"
                data={cuisines.map((item) => item.name)}
                clearable
                leftSection={
                  <Icon
                    fontSize={20}
                    className="ms-1"
                    icon={
                      cuisines.find((item) => item.name === selectedCuisine)?.icon ||
                      'mdi:cursor-default'
                    }
                  />
                }
                onChange={(val) => setSelectedCuisine(val)}
              />
              <TextInput
                radius="xl"
                size="md"
                placeholder="Search for recipes"
                className="flex-grow"
                rightSection={
                  <ActionIcon size={32} radius="xl" variant="filled" className="!bg-secondary">
                    <Icon icon="bi:search" />
                  </ActionIcon>
                }
              />
            </div>
          </div>
        </BackgroundImage>
      </header>
      <main className="container mx-auto mt-5 flex-grow">
        <LoadingContext.Provider value={loading}>
          {loading && <div>loading...</div>}
          {!loading && children}
        </LoadingContext.Provider>
      </main>
      <footer className="bg-slate-700 p-3 text-center text-white">
        <div className="mb-2 text-sm">
          Built with <strong>Next.js</strong>, <strong>Tailwind CSS</strong>,{' '}
          <strong>TypeScript</strong>, deployed on <strong>Vercel</strong>, and powered by the{' '}
          <strong>Spoonacular API</strong>.
        </div>
        <div className="text-xs">&#169; {new Date().getFullYear()} Happy Fork Recipes</div>
      </footer>
    </>
  );
};
