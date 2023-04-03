import * as React from 'react';
import { IDimensao } from '../contexts/DimensaoContext';

interface IDimensaoProps extends IDimensao {
  children: JSX.Element;
}

export default function DimensaoComponent({ children, x, y }: IDimensaoProps) {
  const tableProps = {
    style: {
      border: 'solid 1px',
      borderCollapse: 'collapse',
    },
    cellProps: {
      style: { border: 'solid 1px #fff', padding: '8px' },
    },
  };

  const Cells = (pos: { x: number; y: number }) => {
    const cells = Array(pos.y - 1)
      .fill(null)
      .map((_: any, k: number) => (
        <tr {...tableProps.cellProps} key={k}>
          {Array(pos.x - 1)
            .fill(null)
            .map((_: any, j: number) => (
              <td {...tableProps.cellProps} key={j}></td>
            ))}
        </tr>
      ))
      .map((e) => e);

    return <div>{cells.map((e: JSX.Element) => e)}</div>;
  };
  return (
    <div style={{ position: 'relative' }}>
      {children}
      <table {...tableProps}>
        <Cells x={x} y={y} />
      </table>
    </div>
  );
}
