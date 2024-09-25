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
      href={{ pathname: '/recipe', query: { id: item.id } }}
      key={item.id}
      className="relative mb-5 block h-auto w-full overflow-hidden rounded-2xl border border-gray-400"
    >
      <Image
        src={item.image}
        alt={item.title}
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: '100%', height: 'auto' }}
      />
      <div className="absolute top-0 w-full overflow-hidden text-ellipsis whitespace-nowrap bg-gradient-to-b from-black to-transparent p-4 pb-14 text-lg font-bold text-white">
        {item.title}
      </div>
      <div className="absolute bottom-0 w-full p-3 text-right">
        {item.diets
          ?.slice(0, 3)
          .map((item) => (
            <Badge
              className="mr-1 inline-block last:mr-0"
              key={item}
              size="sm"
              color="orange"
            >{`${item.slice(0, 1).toUpperCase()}${item.slice(1)}`}</Badge>
          ))}
      </div>
    </Link>
  );
}
