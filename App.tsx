import * as React from 'react';
import './style.css';
import styled from 'styled-components';

import RoboComponent from './src/components/RoboComponent';
import DimensaoComponent from './src/components/DimensaoComponent';

import { TRoboContext, useRobo } from './src/contexts/RoboContext';

import Motor from './src/engine';
import {
  TDeslocamento,
  TDimensao,
  TOrientacao,
} from './src/engine/definitions/types';

export default function App() {
  let dimensao: TDimensao = { x: 10, y: 10 };
  const robo: TRoboContext = useRobo();
  const [saidaAnalogica, setSaidaAnalogica] = React.useState<any>({} as any);
  const [deslocamentoAtual, setDeslocamentoAtual] = React.useState('');
  const [timerLeitor, setTimerLeitor] = React.useState(0);
  const [deslocamentos, setDeslocamentos] = React.useState(
    'FFFFFFFFFDFDFFFFFFETTTTTFFFFFFDFFFFFFTDEEFFFDDEETTTFFFFFTTTTDDDEEE'
  );

  React.useEffect(() => {
    console.log('start');
    lerHistoricoDeDeslocamentos(robo, dimensao, deslocamentos, timerLeitor);
  }, [robo.ligado]);

  async function lerHistoricoDeDeslocamentos(
    robo: TRoboContext,
    dimensao: TDimensao,
    deslocamentos: string,
    timerLeitor: number
  ) {
    const motor = Motor(15.5, 15.5);

    let coord = { x: robo.state.x, y: robo.state.y };
    let orientacaoAtual: TOrientacao = robo.state.orientacaoAtual;
    let rotacao = robo.state.rotacao;

    if (!robo.ligado) return clearInterval(timerLeitor);

    const arrayDeslocamentos = deslocamentos
      .replace(/\n+\s+|\s|\n/g, '')
      .split('');

    setTimerLeitor(
      setInterval(() => {
        const deslocamento: TDeslocamento = arrayDeslocamentos.shift();

        const dadoInvalido = !/[FTED]/.test(deslocamento);

        if (!deslocamento || dadoInvalido) {
          robo.handleLigar(false);
          return clearInterval(timerLeitor);
        }

        const state = motor.movimentar(
          dimensao,
          coord,
          deslocamento,
          orientacaoAtual,
          rotacao
        );

        setSaidaAnalogica(state.saidaAnalogica);

        orientacaoAtual = state.saidaLogica.status.novaOrientacao;
        rotacao = state.saidaLogica.status.rotacao;

        robo.handleState({
          x: coord.x,
          y: coord.y,
          orientacaoAtual,
          rotacao,
        });

        setDeslocamentoAtual(deslocamento);
      }, 1000)
    );
  }

  function handleReiniciar() {
    robo.handleState({
      x: 0,
      y: 0,
      orientacaoAtual: 'N',
      rotacao: 0,
    });
    setSaidaAnalogica({
      coord: { x: 0, y: 0 },
      status: { rotacao: 0 },
    });
  }

  function PainelControle({ robo }: { robo: TRoboContext }) {
    const handleCarregarDeslocamentos = (v: any) =>
      setDeslocamentos(v.target.value);

    const handleSetDeslocamento = (tipo: string) =>
      setDeslocamentos((s) => s + tipo);

    const handleLimparDeslocamentos = () => setDeslocamentos('');

    const labelBotao = robo.ligado ? 'Desligar' : 'Ligar';
    return (
      <PainelConainer>
        <button onClick={() => robo.handleLigar(!robo.ligado)}>
          {labelBotao}
        </button>
        <button onClick={handleReiniciar} disabled={robo.ligado}>
          Reiniciar
        </button>
        <br />
        <p>
          <p>
            <button onClick={() => handleSetDeslocamento('F')}>frente</button>
            <button onClick={() => handleSetDeslocamento('T')}>atras</button>
            <button onClick={() => handleSetDeslocamento('D')}>direita</button>
            <button onClick={() => handleSetDeslocamento('E')}>esquerda</button>
            <br />
            <br />
            <button onClick={() => handleLimparDeslocamentos()}>apagar</button>
          </p>
          <textarea
            value={deslocamentos}
            onChange={handleCarregarDeslocamentos}
          ></textarea>
        </p>
      </PainelConainer>
    );
  }

  return (
    <div>
      <h6>Demonstração Visual do Algoritmo - Aspirador Inteligente</h6>
      <small style={{ fontSize: 10 }}>
        X: {robo.state.x} | Y: {robo.state.y} <br />
        rotação: {robo.state.rotacao} <br /> deslocamento: {deslocamentoAtual}{' '}
        <br />
        orientação: {robo.state.orientacaoAtual}
      </small>
      <DimensaoComponent x={dimensao.x} y={dimensao.y}>
        <RoboComponent
          x={saidaAnalogica.coord?.x}
          y={saidaAnalogica.coord?.y}
          rotacao={saidaAnalogica.status?.rotacao}
          ligado={robo.ligado}
        />
      </DimensaoComponent>
      <PainelControle robo={robo} />
    </div>
  );
}

const PainelConainer = styled.div`
  margin-top: 10px;
`;
