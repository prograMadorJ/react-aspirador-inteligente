import * as React from 'react';
import styled from 'styled-components';

export default function RoboComponent(props: {
  x: number;
  y: number;
  rotacao: number;
  ligado: boolean;
}) {
  const CirculoExterno = ({ children }) => (
    <CirculoExternoContainer>{children}</CirculoExternoContainer>
  );

  const CirculoInterno = (props: {
    children?: JSX.Element;
    w: number;
    h: number;
    y?: number;
    bg?: string;
  }) => (
    <CirculoInternoContainer {...props}>
      {props?.children}
    </CirculoInternoContainer>
  );

  const Vassoura = (props: {
    y: number;
    x: number;
    sentidoRotacao: 'D' | 'E';
    ligado: boolean;
  }) => {
    return <VassouraContainer {...props} />;
  };

  return (
    <Container {...props}>
      <Vassoura x={2} y={0} sentidoRotacao={'D'} ligado={props.ligado} />
      <Vassoura x={13} y={0} sentidoRotacao={'E'} ligado={props.ligado} />
      <CirculoExterno>
        <Frente />
        <CirculoInterno {...{ w: 7, h: 7 }}>
          <CirculoInterno {...{ w: 3, h: 1, bg: '#ff0', y: 3 }} />
        </CirculoInterno>
      </CirculoExterno>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  bottom: 1px;
  left: 1px;
  width: 16px;
  height: 16px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  transform: ${({ x, y, rotacao }) =>
    `translate(${x}px, ${y}px) rotate(${rotacao}turn)`};
  transition: transform 1s cubic-bezier(0, 0, 0.9, 0.9);
`;

const CirculoInternoContainer = styled.div`
  width: ${(props) => props.w}px;
  height: ${(props) => props.h}px;
  position: relative;
  top: ${(props) => (props.y ? props.y + 'px' : 'auto')};
  border: solid 1pt #000;
  border-radius: 50px;
  background: ${(props) => props.bg};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CirculoExternoContainer = styled.div`
  width: 16px;
  height: 13px;
  border: solid 1pt #000;
  border-radius: 100px;
  background: #f00;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
`;

const Frente = styled.div`
  position: absolute;
  z-index: 2;
  top: 2px;
  left: auto;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid #0ff;
`;

const convertSentidoRotacao = (valor: string) =>
  valor === 'D' ? 'to_right' : 'to_left';

const VassouraContainer = styled.div`
  position: absolute;
  top: ${(props) => props.y}px;
  left: ${(props) => props.x}px;
  z-index: 0;
  border-left: 1px solid #000;
  height: 5px;
  animation: ${(props) =>
    !props.ligado
      ? 'none'
      : `spin_${convertSentidoRotacao(
          props.sentidoRotacao
        )} 0.2s linear infinite`};
`;
