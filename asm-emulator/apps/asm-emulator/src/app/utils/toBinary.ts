export function toBinary(value: number): string {
  return value.toString(2).padStart(16, '0');
}
