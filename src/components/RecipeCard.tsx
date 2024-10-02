import Link from 'next/link';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Recipe } from '../types/types';
import Img from './ImgBlur';

interface Props {
  recipe: Recipe;
  className?: string;
}

export function RecipeCard({ recipe, className }: Props) {
  function ribbonText() {
    if (recipe.veryPopular) {
      return 'Popular';
    } else if (recipe.veryHealthy) {
      return 'Healthy';
    } else if (recipe.cheap) {
      return 'Cheap';
    } else {
      return null;
    }
  }

  return (
    <Link
      href={{ pathname: '/recipe', query: { id: recipe.id } }}
      key={recipe.id}
      className={`${className} group relative block h-auto w-full overflow-hidden rounded-lg shadow-lg`}
    >
      <Img
        src={recipe.image}
        description={recipe.title}
        width={recipe.img.width}
        height={recipe.img.height}
        dataUrl={recipe.dataUrl}
        className="inline-block h-full w-full transition-transform duration-300 ease-in-out group-hover:scale-105 group-focus:scale-105"
      />

      {/* Card Text Overlay */}
      <div className="absolute bottom-0 flex w-full bg-black/50 p-4 font-semibold text-white">
        <div className="flex-grow overflow-hidden text-ellipsis whitespace-nowrap pr-3">
          {recipe.title}
        </div>
        <div className="flex items-center text-sm font-light">
          <Icon icon="ph:heart-fill" className="text-2xl" /> &nbsp;{recipe.aggregateLikes}
        </div>
      </div>

      {/* Ribbon */}
      {ribbonText() !== null && (
        <div className="absolute right-0 top-0 translate-x-14 translate-y-4 rotate-45 transform bg-secondary px-16 py-1 text-center text-xs font-bold text-white">
          {ribbonText()}
        </div>
      )}
    </Link>
  );
}
