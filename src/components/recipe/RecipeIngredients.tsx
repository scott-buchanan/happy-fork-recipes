'use client';
import { Recipe } from '@/lib/types/types';
import Img from '@/components/ImgBlur';
import { Icon } from '@iconify/react/dist/iconify.js';
import { SegmentedControl } from '@mantine/core';
import { roundToTenth } from '@/lib/utils/utils';
import { capitalize } from '@/lib/utils/utils';
import { useGlobalContext } from '@/context/GlobalContext';

interface RecipeInfoProps {
  recipeData: Recipe | null;
}

export default function Ingredients({ recipeData = null }: RecipeInfoProps) {
  const { metric, setMetric } = useGlobalContext();

  return (
    recipeData && (
      <div className="overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-800 lg:max-w-96">
        <Img
          src={recipeData.image}
          description={`A picture of ${recipeData.title}`}
          width={recipeData.img.width}
          height={recipeData.img.height}
          dataUrl={recipeData.dataUrl}
          className="w-full"
        >
          <div className="flex flex-wrap justify-center gap-x-5 bg-black/50 px-5 pt-3 text-white">
            <div className="mb-3 flex items-center">
              <Icon icon="mdi:clock-outline" className="mr-3 text-3xl" />
              <span className="text-sm">{recipeData.readyInMinutes} minutes</span>
            </div>
            <div className="mb-3 flex items-center">
              <Icon icon="ph:fork-knife" className="mr-3 text-3xl" />
              <span className="text-sm">Serves {recipeData.servings}</span>
            </div>
          </div>
        </Img>
        <div className="p-5">
          <div className="mb-5 flex flex-wrap justify-between">
            <h2 className="mb-3">Ingredients</h2>
            <SegmentedControl
              classNames={{
                root: 'dark:bg-gray-600',
                label: 'dark:text-white',
                indicator: 'dark:bg-gray-800',
              }}
              className="mb-3"
              data={['Metric', 'Imperial']}
              value={metric ? 'Metric' : 'Imperial'}
              radius="xl"
              onChange={() => setMetric(!metric)}
            />
          </div>

          <ul className="ml-2 sm:ml-0 sm:columns-2 lg:ml-3 lg:columns-1">
            {recipeData.extendedIngredients?.map((ingredient) => (
              <li key={JSON.stringify(ingredient)}>
                {`${metric ? roundToTenth(ingredient.measures.metric.amount) : ingredient.measures.us.amount} ${ingredient.measures[metric ? 'metric' : 'us'].unitShort} ${capitalize(ingredient.nameClean || ingredient.name)}`}
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  );
}
