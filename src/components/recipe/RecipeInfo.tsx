import { Recipe } from '@/lib/types/types';
import { Badge } from '@mantine/core';

interface RecipeInfoProps {
  recipeData?: Recipe | null;
  error?: string | null;
}

export default function RecipeInfo({ recipeData = null, error = null }: RecipeInfoProps) {
  return (
    <>
      {error && <p>{error}</p>}
      {recipeData && (
        <div>
          <span className="flex">
            <h1 className="mr-3">{recipeData?.title}</h1>
          </span>

          {recipeData.diets?.map((item) => (
            <Badge className="mb-2 mr-2 inline-block !bg-slate-800 last:mr-0" key={item} size="sm">
              {item}
            </Badge>
          ))}

          {recipeData.veryHealthy && (
            <Badge className="mb-2 mr-2 inline-block !bg-slate-800 last:mr-0" size="sm">
              Very Healthy
            </Badge>
          )}

          <p className="mt-3" dangerouslySetInnerHTML={{ __html: recipeData.summary }} />

          <h2 className="mt-8">Instructions</h2>
          {recipeData.analyzedInstructions?.length > 0 ? (
            recipeData.analyzedInstructions?.map((item) => {
              return (
                <div key={item.name}>
                  {item.name && <h3 className="pb-3 pt-10">{item.name}</h3>}
                  <ol>
                    {item.steps?.map((step) => (
                      <li key={step.number} className="last-of-type:mb-0">
                        {step.step}
                      </li>
                    ))}
                  </ol>
                </div>
              );
            })
          ) : (
            <div dangerouslySetInnerHTML={{ __html: recipeData.instructions }} />
          )}
        </div>
      )}
    </>
  );
}
