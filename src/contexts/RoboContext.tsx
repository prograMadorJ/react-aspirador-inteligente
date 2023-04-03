import * as React from 'react';
import { createContext, useState, useContext } from 'react';
import { TOrientacao } from '../engine/definitions/types';

export interface IRoboState {
  x?: number;
  y?: number;
  orientacaoAtual?: TOrientacao;
  rotacao?: number;
}

export type TRoboContext = {
  state: IRoboState;
  ligado: boolean;
  handleState: (state: IRoboState) => void;
  handleLigar: (value: boolean) => void;
};

const RoboContext = createContext({} as TRoboContext);

const RoboProvider = ({ children }) => {
  const [state, setState] = useState<IRoboState>({
    x: 0,
    y: 0,
    orientacaoAtual: 'N',
    rotacao: 0,
  });

  const [ligado, setLigado] = useState(false);

  const handleState = (state: IRoboState) => setState((s) => ({ s, ...state }));

  const handleLigar = (value: boolean) => setLigado(value);

  return (
    <RoboContext.Provider value={{ state, ligado, handleState, handleLigar }}>
      {children}
    </RoboContext.Provider>
  );
};

const useRobo = () => useContext(RoboContext);

export { RoboProvider, useRobo };
