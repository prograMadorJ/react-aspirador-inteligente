import * as React from 'react';
import { createContext, useState, useContext } from 'react';

export interface IDimensao {
  x: number;
  y: number;
}

const DimensaoContext = createContext({} as any);

const DimensaoProvider = ({ children }) => {
  const [dimensao, setDimensao] = useState<IDimensao>({
    x: 0,
    y: 0,
  });

  return (
    <DimensaoContext.Provider value={{ dimensao, setDimensao }}>
      {children}
    </DimensaoContext.Provider>
  );
};

const useDimensao = () => useContext(DimensaoContext);

export { DimensaoProvider, useDimensao };
