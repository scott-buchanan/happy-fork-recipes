import { Img } from './types';

export interface SearchResults {
  query: string | null;
  cuisine: string | null;
  recipes: SearchResult[];
  error?: string;
}

export interface SearchResult {
  id: number;
  title: string;
  imageType: string;
  image: string;
  dataUrl: string;
  img: Img;
}

export interface SearchParam {
  name: string;
  active: boolean;
}
