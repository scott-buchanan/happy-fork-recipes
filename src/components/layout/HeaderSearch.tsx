'use client';
import { Select, TextInput, ActionIcon } from '@mantine/core';
import { Icon } from '@iconify/react';
import { cuisines } from '@/lib/constants/constants';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function HeaderSearch() {
  // next
  const router = useRouter();
  const searchParams = useSearchParams();
  // state
  const [localQuery, setLocalQuery] = useState<string>(
    searchParams.get('q')?.split('+').join(' ') || '',
  );
  const [localCuisine, setLocalCuisine] = useState<string>(searchParams.get('cuisine') || '');
  const [cleanQuery, setCleanQuery] = useState<string>(localQuery?.replaceAll('!', ''));
  const [cleanCuisine, setCleanCuisine] = useState<string>(localCuisine?.replace('!', ''));
  // static
  const cuisineData = cuisines?.map((item) => ({ label: item.name, value: item.value }));

  function performSearch(): void {
    const params: string[] = [];

    if (cleanCuisine) {
      params.push(`cuisine=${encodeURIComponent(cleanCuisine)}`);
    }

    if (cleanQuery) {
      params.push(`q=${cleanQuery.split(' ').join('+')}`);
    }

    const queryString = params.join('&');
    router.push(`/search?${queryString}`);
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

  useEffect(() => {
    setCleanQuery(localQuery?.replaceAll('!', ''));
    setCleanCuisine(localCuisine?.replace('!', ''));
  }, [localQuery, localCuisine]);

  return (
    <div className="w-full gap-5 py-4 sm:flex">
      <Select
        size="md"
        radius="xl"
        placeholder="Select a cuisine"
        className="mb-3 sm:mb-0"
        data={cuisineData}
        clearable
        value={cleanCuisine}
        onChange={(_value, option) => setLocalCuisine(option?.value || '')}
        leftSection={
          <Icon
            fontSize={20}
            className="ms-1"
            icon={cuisines.find((item) => item.name === localCuisine)?.icon || 'mdi:cursor-default'}
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
        defaultValue={cleanQuery}
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
  );
}
