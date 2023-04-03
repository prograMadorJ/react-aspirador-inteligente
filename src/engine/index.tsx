import { converter } from './devices/Conversor';
import { movimentar } from './devices/Movimentador';

export default function Motor(
  dimensaoEstruturaX: number,
  dimensaoEstruturaY: number
) {
  return converter(movimentar, dimensaoEstruturaX, dimensaoEstruturaY);
}
