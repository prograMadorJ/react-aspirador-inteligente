import * as types from '../definitions/types';

export class CalculadorCoordenadas {
  calcular = (
    dimensao: types.TDimensao,
    coord: types.TCoord,
    tipoCoord: 'x' | 'y',
    flagMaiorQueZero: true | false
  ) => {
    let resultado: number = 0;
    if (
      flagMaiorQueZero &&
      coord[tipoCoord] > 0 &&
      coord[tipoCoord] < dimensao[tipoCoord]
    ) {
      resultado = Math.abs(coord[tipoCoord] - 1);
    } else if (coord[tipoCoord] < dimensao[tipoCoord]) {
      resultado = Math.abs(coord[tipoCoord] + 1);
    }
    resultado = resultado >= dimensao[tipoCoord] ? resultado - 1 : resultado;
    return resultado;
  };
}
