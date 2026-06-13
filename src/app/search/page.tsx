import { PageTemplate } from '@/components/layout/PageTemplate';
import SearchResultsHeader from '@/components/search/SearchResultsHeader';
import RecipeCardContainer from '@/components/recipeCards/RecipeCardContainer';
import { getSearchRecipes } from '@/lib/api/api';
import { SearchResults } from '@/lib/types/search';

interface SearchPageProps {
  searchParams: {
    q: string;
    cuisine?: string;
    page?: string;
  };
}

export default async function Search({ searchParams }: SearchPageProps) {
  const { cuisine = '', q: searchString = '', page = '1' } = searchParams;
  const searchResults: SearchResults = await getSearchRecipes(
    getQuery(searchString),
    getCuisine(cuisine),
    page,
  );

  // only send active cuisine
  function getCuisine(cuisine: string) {
    if (!cuisine) return '';
    return cuisine.charAt(0) === '!' ? '' : cuisine;
  }

  // only send active query words
  function getQuery(query: string) {
    if (!query) return '';
    return query
      .split(' ')
      ?.map((word) => {
        if (word.charAt(0) !== '!') {
          return word;
        }
      })
      .join(' ')
      .trim();
  }

  return (
    <PageTemplate>
      <section aria-label="Search Results" key={`${searchString}${cuisine}`}>
        <header className="my-3">
          <SearchResultsHeader query={searchString} cuisine={cuisine} />
        </header>

        <RecipeCardContainer data={searchResults} pagination={true} />
      </section>
    </PageTemplate>
  );
}
