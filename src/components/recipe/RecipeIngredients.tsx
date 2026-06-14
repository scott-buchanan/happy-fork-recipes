'use client';
import { Recipe } from '@/lib/types/types';
import Img from '@/components/ImgBlur';
import { Icon } from '@iconify/react/dist/iconify.js';
import { SegmentedControl } from '@mantine/core';
import { roundToTenth, roundToHundred, capitalize } from '@/lib/utils/utils';
import { useGlobalContext } from '@/context/GlobalContext';

interface RecipeInfoProps {
  recipeData: Recipe | null;
}

export default function Ingredients({ recipeData = null }: RecipeInfoProps) {
  const { metric, setMetric } = useGlobalContext();

  function formatIngredient(
    ingredient: Recipe['extendedIngredients'][number],
    metric: boolean,
  ): string {
    const measure = metric ? ingredient.measures.metric : ingredient.measures.us;
    const amount = metric ? roundToTenth(measure.amount) : roundToHundred(measure.amount);
    const unit = measure.unitShort;
    const name = capitalize(ingredient.nameClean || ingredient.name);
    return `${amount} ${unit} ${name}`;
  }

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
              <li key={JSON.stringify(ingredient)}>{formatIngredient(ingredient, metric)}</li>
            ))}
          </ul>
        </div>
      </div>
    )
  );
}
