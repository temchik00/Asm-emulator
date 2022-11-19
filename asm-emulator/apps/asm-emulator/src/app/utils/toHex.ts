export function toHex(value: number): string {
  const val = Math.abs(value);
  if (value < 0) return '-0x' + val.toString(16);
  else return '0x' + val.toString(16);
}
