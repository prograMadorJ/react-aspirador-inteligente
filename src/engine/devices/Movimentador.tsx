import {
  TDimensao,
  TCoord,
  TDeslocamento,
  TOrientacao,
} from '../definitions/types';
import { CalculadorCoordenadas } from './CalculadorCoordenadas';
import { obterOrientacao } from './Orientador';
import { efetuarDeslocamento } from './CalculadorDeslocamento';

export const movimentar = (
  dimensao: TDimensao,
  coord: TCoord,
  deslocamento: TDeslocamento,
  orientacao: TOrientacao,
  rotacao: number
) => {
  const calcCoord = new CalculadorCoordenadas();

  let novaOrientacao = obterOrientacao(deslocamento, orientacao);

  if (!novaOrientacao) {
    efetuarDeslocamento(calcCoord, deslocamento, orientacao, dimensao, coord);
    novaOrientacao = orientacao;
  }

  return { status: { rotacao, novaOrientacao }, coord };
};
