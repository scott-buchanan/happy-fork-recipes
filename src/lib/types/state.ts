// State for the whole application
export interface GlobalState {
  metric: boolean;
  setMetric: (value: boolean) => void;
  query: { name: string; active: boolean }[] | null;
  setQuery: (value: { name: string; active: boolean }[] | null) => void;
  cuisine: { name: string; active: boolean } | null;
  setCuisine: (value: { name: string; active: boolean } | null) => void;
}
