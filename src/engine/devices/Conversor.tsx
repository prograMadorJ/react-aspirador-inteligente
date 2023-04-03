import { Deslocamento } from '../definitions/enums';
import {
  TDimensao,
  TCoord,
  TDeslocamento,
  TOrientacao,
} from '../definitions/types';

export const converter = (
  movimentarFn: Function,
  dimensaoEstruturaX: number,
  dimensaoEstruturaY: number
) => {
  const converteUnidadeDeslocamentoX = (valor = 0) =>
    dimensaoEstruturaX * valor;

  const converteUnidadeDeslocamentoY = (valor = 0) =>
    dimensaoEstruturaY * valor * -1;

  const converterRotacaoParaUnidadeTurn = (valor = 0) => valor / 4;

  return {
    movimentar: (
      dimensao: TDimensao,
      coord: TCoord,
      deslocamento: TDeslocamento,
      orientacao: TOrientacao,
      rotacao: number
    ) => {
      const saidaLogica = movimentarFn(
        dimensao,
        coord,
        deslocamento,
        orientacao,
        rotacao
      );

      const saidaAnalogica = structuredClone(saidaLogica);

      saidaAnalogica.coord = {
        x: converteUnidadeDeslocamentoX(saidaLogica.coord.x),
        y: converteUnidadeDeslocamentoY(saidaLogica.coord.y),
      };

      const D: TDeslocamento = 'D';
      const E: TDeslocamento = 'E';

      if ([E, D].indexOf(deslocamento) > -1) {
        const valores = {
          [Deslocamento.DIREITA]: 1,
          [Deslocamento.ESQUERDA]: -1,
        };
        saidaLogica.status.rotacao = valores[deslocamento]
          ? saidaLogica.status.rotacao + valores[deslocamento]
          : saidaLogica.status.rotacao;
      }

      saidaAnalogica.status.rotacao = converterRotacaoParaUnidadeTurn(
        saidaLogica.status.rotacao
      );

      return { saidaAnalogica, saidaLogica };
    },
  };
};
