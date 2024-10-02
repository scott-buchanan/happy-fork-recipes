'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { getSearchRecipes } from '@/lib/api/calls';

import { SearchResults, SearchResult, SearchParam } from '@/lib/types/search';

import { Chip } from '@mantine/core';
import { Icon } from '@iconify/react/dist/iconify.js';

import { PageTemplate } from '@/components/PageTemplate';
import { RecipeCard } from '@/components/RecipeCard';
import { Loader } from '@/components/Loader';

export default function Search() {
  const searchParams = useSearchParams();

  // state
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState<SearchParam[]>(setQueryFromUrl());
  const [cuisine, setCuisine] = useState<SearchParam | null>(setCuisineFromUrl());
  const [searchResults, setSearchResults] = useState<SearchResults | null>(null);

  function setCuisineFromUrl(): SearchParam | null {
    return searchParams.get('cuisine')
      ? {
          name: searchParams.get('cuisine') || '',
          active: true,
        }
      : null;
  }

  function setQueryFromUrl(): SearchParam[] {
    return (
      searchParams
        .get('q')
        ?.trim()
        .split(' ')
        .map((word) => ({ name: word, active: true })) || []
    );
  }

  // toggle search query section or cuisine type on or off
  function handleChipChange(target: string, value: boolean, queryWord?: SearchParam) {
    switch (target) {
      case 'cuisine':
        if (cuisine) setCuisine({ name: cuisine.name, active: value });
        break;
      case 'q':
        // toggle active state of query word
        const newQuery =
          query?.map((item) =>
            item.name === queryWord?.name ? { ...item, active: value } : item,
          ) ?? [];
        setQuery(newQuery);
        break;
    }
  }

  async function getSearchResults() {
    setLoaded(false);

    const searchString = query
      .filter((item) => item.active)
      .map((item) => item.name)
      .join(' ');

    const response: SearchResults = await getSearchRecipes(
      searchString,
      cuisine?.active ? cuisine.name : '',
    );

    if (response.error) {
      setError(response.error);
    }

    setSearchResults(response);

    setLoaded(true);
  }

  // set query and cuisine state from url params when they change
  useEffect(() => {
    setQuery(setQueryFromUrl());
    setCuisine(setCuisineFromUrl());
  }, [searchParams]);

  // get new SearchResults on query or cuisine change
  // triggers on page load and when query or cuisine changes
  useEffect(() => {
    getSearchResults();
  }, [query, cuisine]);

  return (
    <PageTemplate>
      <section aria-label="Search Results">
        <header className="mb-6 mt-3">
          <h2>Search Results</h2>
          {(cuisine || query) && (
            <ul className="flex list-none space-x-3 p-0">
              {cuisine && (
                <li>
                  <strong className="mr-3 text-sm">Cuisine:</strong>
                  <Chip
                    className="mr-3 inline-block"
                    color="orange"
                    variant="outline"
                    value="cuisine"
                    checked={cuisine.active}
                    icon={<Icon icon="carbon:checkmark" />}
                    onChange={(value: boolean) => handleChipChange('cuisine', value)}
                  >
                    {cuisine.name}
                  </Chip>
                </li>
              )}
              {query && (
                <li>
                  {query.length > 0 && (
                    <>
                      <strong className="mr-3 text-sm">
                        {query.length > 1 ? 'Keywords' : 'Keyword'}:
                      </strong>
                      {query.map((item: { name: string; active: boolean }, index) => (
                        <Chip
                          key={index}
                          className="mr-3 inline-block"
                          color="orange"
                          variant="outline"
                          checked={item.active}
                          value="q"
                          icon={<Icon icon="carbon:checkmark" />}
                          onChange={(value: boolean) => handleChipChange('q', value, item)}
                        >
                          {item.name}
                        </Chip>
                      ))}
                    </>
                  )}
                </li>
              )}
            </ul>
          )}
        </header>

        {!loaded && <Loader />}
        {error && <p className="mt-3 text-center">{error}</p>}
        {loaded && searchResults && !searchResults?.error && (
          <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {searchResults.recipes.length > 0 ? (
              searchResults.recipes.map((item: SearchResult, index: number) => (
                <RecipeCard key={index} recipe={item} />
              ))
            ) : (
              <p>No recipes found.</p>
            )}
          </div>
        )}
      </section>
    </PageTemplate>
  );
}
