import Link from 'next/link';
import { Badge } from '@mantine/core';
import { Recipe } from '../types/types';
import Image from 'next/image';

interface Props {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: Props) {
  return (
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
        className="transition-transform ease-in hover:scale-105"
        style={{ width: '100%', height: 'auto' }}
      />
      <div className="absolute bottom-0 w-full overflow-hidden text-ellipsis whitespace-nowrap bg-black/50 p-4 text-lg font-bold text-white">
        {recipe.title}
      </div>
      <div className="absolute top-0 w-full p-3 text-right">
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
  );
}
