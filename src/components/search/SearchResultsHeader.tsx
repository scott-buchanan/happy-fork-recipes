'use client';
import { useEffect, useState, ReactNode } from 'react';
import { Chip } from '@mantine/core';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useRouter } from 'next/navigation';
import { cuisines } from '@/lib/constants/constants';

interface objParam {
  name: string;
  active: boolean;
}

export default function SearchResultsHeader({
  query,
  cuisine,
}: {
  query: string | null;
  cuisine: string | null;
}) {
  const router = useRouter();
  const [objQuery, setObjQuery] = useState<objParam[] | null>(null);
  const [objCuisine, setObjCuisine] = useState<objParam | null>(null);
  const [pageTitle, setPageTitle] = useState<string | ReactNode>('');

  // page load
  useEffect(() => {
    const arrQuery: objParam[] = [];
    if (query) {
      query.split(' ').forEach((word) => {
        const isActive = word.charAt(0) !== '!';
        arrQuery.push({ name: isActive ? word : word.slice(1), active: isActive });
      });
    }
    setObjQuery(arrQuery);

    if (cuisine) {
      setObjCuisine({
        name: cuisine.charAt(0) === '!' ? cuisine.slice(1) : cuisine,
        active: cuisine.charAt(0) !== '!',
      });
    }
  }, [query, cuisine]);

  // when the search changes, update the page title
  useEffect(() => {
    const cuisineName = cuisines.find((item) => item.value === objCuisine?.name)?.name;
    const activeQueries = objQuery?.filter((item) => item.active).length || 0;

    // if no cuisine and no active query, show generic title
    if (objCuisine && !objCuisine.active && activeQueries === 0) {
      setPageTitle('Showing all recipes');
      return;
    }

    // if cuisine is active and no active query, show cuisine title
    if (objCuisine && objCuisine?.active && activeQueries === 0) {
      setPageTitle(
        <>
          Results for <strong className="font-semi-bold text-2xl">{cuisineName}</strong> cuisine
        </>,
      );
      return;
    }
    if ((objCuisine && objCuisine.active) || activeQueries > 0) {
      const cleanQuery = query
        ?.split(' ')
        .map((word) => (word.charAt(0) !== '!' ? word : null))
        .join(' ');
      setPageTitle(
        <>
          Results for{' '}
          <strong className="font-semi-bold text-2xl">
            {objCuisine?.active ? cuisineName : ''} {cleanQuery}
          </strong>
        </>,
      );
    }
  }, [objQuery, objCuisine, query]);

  // do the search
  useEffect(() => {
    if (objQuery || objCuisine) {
      const queryParts = [];

      if (objCuisine) {
        queryParts.push(`cuisine=${objCuisine.active ? '' : '!'}${objCuisine.name}`);
      }

      if (objQuery) {
        const queryString = objQuery
          ?.map((item) => (item.active ? item.name : `!${item.name}`))
          .join('+');
        queryParts.push(`q=${queryString}`);
      }

      const queryString = queryParts.join('&');

      router.push(`/search?${queryString}`);
    }
  }, [objQuery, objCuisine, router]);

  // toggle search query section or cuisine type on or off
  function handleChipChange(target: string, value: boolean, queryWord?: string) {
    switch (target) {
      case 'cuisine':
        if (objCuisine) {
          setObjCuisine({ ...objCuisine, active: value });
        }
        break;
      case 'q':
        // toggle active state of query word
        if (objQuery) {
          setObjQuery(
            objQuery.map((item) => (item.name === queryWord ? { ...item, active: value } : item)),
          );
        }
        break;
    }
  }

  function getCuisineName(value: string) {
    return cuisines.find((item) => item.value === value)?.name || '';
  }

  return (
    <div className="mb-4 flex items-center justify-between">
      <div>
        <h1 className="m-0 text-xl font-light">{pageTitle}</h1>
      </div>
      <div className="flex">
        {objCuisine && (
          <ul className="flex list-none space-x-3 p-0">
            <li className="m-0">
              <strong className="text-sm">Cuisine:</strong>
              <Chip
                className="ml-3 inline-block"
                color="orange"
                variant="outline"
                value="cuisine"
                checked={objCuisine.active}
                icon={<Icon icon="carbon:checkmark" />}
                onChange={(value: boolean) => handleChipChange('cuisine', value)}
              >
                {getCuisineName(objCuisine.name)}
              </Chip>
            </li>
          </ul>
        )}
        {objQuery && objQuery.length > 0 && (
          <div className="flex items-center">
            <strong className="ml-3 text-sm">
              {objQuery.length > 1 ? 'Keywords' : 'Keyword'}:
            </strong>
            <ul className="flex list-none p-0">
              <li className="m-0">
                {objQuery?.map((item: { name: string; active: boolean }, index) => (
                  <Chip
                    key={index}
                    className="ml-3 inline-block"
                    color="orange"
                    variant="outline"
                    checked={item.active}
                    value="q"
                    icon={<Icon icon="carbon:checkmark" />}
                    onChange={(value: boolean) => handleChipChange('q', value, item.name)}
                  >
                    {item.name}
                  </Chip>
                ))}
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
