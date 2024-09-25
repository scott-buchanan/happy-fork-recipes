import Link from 'next/link';
import { Badge } from '@mantine/core';
import { Recipe, SimilarRecipe } from '../types/types';
import Image from 'next/image';

interface Props {
  recipe: Recipe | SimilarRecipe;
  similar: boolean;
}

export function RecipeCard({ recipe, similar = false }: Props) {
  return similar ? (
    <Link
      href={{ pathname: '/recipe', query: { id: recipe.id } }}
      key={recipe.id}
      className="relative mb-5 block h-auto w-full overflow-hidden rounded-2xl border border-gray-400"
    >
      <Image
        src={recipe.image}
        alt={recipe.title}
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: '100%', height: 'auto' }}
      />
      <div className="absolute top-0 w-full overflow-hidden text-ellipsis whitespace-nowrap bg-gradient-to-b from-black to-transparent p-4 pb-14 text-lg font-bold text-white">
        {recipe.title}
      </div>
      <div className="absolute bottom-0 w-full p-3 text-right">
        {recipe.diets
          ?.slice(0, 3)
          .map((recipe) => (
            <Badge
              className="mr-1 inline-block last:mr-0"
              key={recipe}
              size="sm"
              color="orange"
            >{`${recipe.slice(0, 1).toUpperCase()}${recipe.slice(1)}`}</Badge>
          ))}
      </div>
    </Link>
  ) : (
    <div></div>
  );
}
