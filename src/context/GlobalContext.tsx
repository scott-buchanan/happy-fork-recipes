'use client';
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface GlobalState {
  metric: boolean;
  setMetric: (value: boolean) => void;
  apiUsed: number;
  setApiUsed: (value: number) => void;
}

const GlobalContext = createContext<GlobalState | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [metric, setMetric] = useState<boolean>(true);
  const [apiUsed, setApiUsed] = useState<number>(0);

  return (
    <GlobalContext.Provider value={{ metric, setMetric, apiUsed, setApiUsed }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};
