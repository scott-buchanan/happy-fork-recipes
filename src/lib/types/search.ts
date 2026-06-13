import { Img } from './types';

export interface SearchResults {
  results: SearchResult[];
  totalResults: number;
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
