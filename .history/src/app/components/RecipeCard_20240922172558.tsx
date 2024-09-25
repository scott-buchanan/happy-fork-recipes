import Link from 'next/link';
import { Badge } from '@mantine/core';
import { Recipe, SimilarRecipe } from '../types/types';
import Image from 'next/image';

interface Props {
  recipe: Recipe | SimilarRecipe;
  similar: boolean;
}

export function RecipeCard({ recipe, similar = false }: Props) {
  return;
  {
        </div>
      </Link>
    ) : (
      <div></div>
    );
  }
}
