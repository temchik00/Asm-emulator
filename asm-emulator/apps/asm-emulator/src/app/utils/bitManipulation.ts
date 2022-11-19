export function isBitSet(num: number, bitPosition: number): boolean {
  return !!(num & (1 << bitPosition));
}

export function enableBit(num: number, bitPosition: number): number {
  return num | (1 << bitPosition);
}

export function clearBit(num: number, bitPosition: number): number {
  return num & ~(1 << bitPosition);
}

export function setBit(
  num: number,
  bitPosition: number,
  state: boolean
): number {
  if (state) return enableBit(num, bitPosition);
  else return clearBit(num, bitPosition);
}

export function splitNumber(num: number, bitPosition: number): number[] {
  const lower = num & ~(1 << bitPosition);
  const upper = num >> bitPosition;
  return [lower, upper];
}
