'use client';
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { SearchParam } from '../lib/types/search';
import { GlobalState } from '../lib/types/state';

const GlobalContext = createContext<GlobalState | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [metric, setMetric] = useState<boolean>(true);
  const [query, setQuery] = useState<SearchParam[] | null>(null);
  const [cuisine, setCuisine] = useState<SearchParam | null>(null);

  return (
    <GlobalContext.Provider value={{ metric, setMetric, query, setQuery, cuisine, setCuisine }}>
      {children}
    </GlobalContext.Provider>
  );
};

// import this into components
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};
