import { Orientacao } from '../definitions/enums';
import { TDeslocamento, TOrientacao } from '../definitions/types';

export const obterOrientacao = (
  deslocamento: TDeslocamento,
  orientacao: TOrientacao
) => {
  const orientacoes = {
    D: {
      N: Orientacao.LESTE,
      S: Orientacao.OESTE,
      L: Orientacao.SUL,
      O: Orientacao.NORTE,
    },
    E: {
      N: Orientacao.OESTE,
      S: Orientacao.LESTE,
      L: Orientacao.NORTE,
      O: Orientacao.SUL,
    },
  };
  const rotacao = orientacoes[deslocamento];
  return !rotacao ? null : rotacao[orientacao];
};
