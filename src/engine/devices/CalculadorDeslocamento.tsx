import {
  TDimensao,
  TCoord,
  TDeslocamento,
  TOrientacao,
} from '../definitions/types';
import { CalculadorCoordenadas } from './CalculadorCoordenadas';

export const efetuarDeslocamento = (
  calculadorCoord: CalculadorCoordenadas,
  deslocamento: TDeslocamento,
  orientacao: TOrientacao,
  dimensao: TDimensao,
  coord: TCoord
) =>
  ({
    F: {
      N: (dimensao: TDimensao, coord: TCoord) =>
        (coord.y = calculadorCoord.calcular(dimensao, coord, 'y', false)),

      S: (dimensao: TDimensao, coord: TCoord) =>
        (coord.y = calculadorCoord.calcular(dimensao, coord, 'y', true)),

      L: (dimensao: TDimensao, coord: TCoord) =>
        (coord.x = calculadorCoord.calcular(dimensao, coord, 'x', false)),

      O: (dimensao: TDimensao, coord: TCoord) =>
        (coord.x = calculadorCoord.calcular(dimensao, coord, 'x', true)),
    },
    T: {
      N: (dimensao: TDimensao, coord: TCoord) =>
        (coord.y = calculadorCoord.calcular(dimensao, coord, 'y', true)),

      S: (dimensao: TDimensao, coord: TCoord) =>
        (coord.y = calculadorCoord.calcular(dimensao, coord, 'y', false)),

      L: (dimensao: TDimensao, coord: TCoord) =>
        (coord.x = calculadorCoord.calcular(dimensao, coord, 'x', true)),

      O: (dimensao: TDimensao, coord: TCoord) =>
        (coord.x = calculadorCoord.calcular(dimensao, coord, 'x', false)),
    },
  }[deslocamento][orientacao](dimensao, coord));
