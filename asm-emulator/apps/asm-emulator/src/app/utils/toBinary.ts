import { environment } from '../../environments/environment';
import { enableBit } from './bitManipulation';

export function toBinary(value: number): string {
  let val = Math.abs(value);
  if (value < 0){
    let mask = enableBit(0, environment.bitDepth) - 1;
    val = (~val & mask) + 1;
  }
  return val.toString(2).padStart(environment.bitDepth, '0');
}
