'use server';

import { getPlaiceholder } from 'plaiceholder';
import defaultImg from '../../../public/images/default-recipe.jpg';

// base 64 function for image blur on load
export async function getImage(src: string) {
  try {
    const buffer = await fetch(src).then(async (res) => Buffer.from(await res.arrayBuffer()));

    const {
      metadata: { height, width },
      ...plaiceholder
    } = await getPlaiceholder(buffer, { size: 10 });

    return {
      ...plaiceholder,
      img: { src, height, width },
    };
  } catch {
    return {
      base64: defaultImg.blurDataURL,
      img: { src: defaultImg.src, height: defaultImg.height, width: defaultImg.width },
    };
  }
}
