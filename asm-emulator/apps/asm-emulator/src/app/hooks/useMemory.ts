import { useCallback, useState } from 'react';

export function useMemory() {
  const [memory, setMemory] = useState<number[]>([]);
  const getItem = useCallback(
    (index: number) => {
      const el = memory[index];
      return el;
    },
    [memory]
  );
  const setItem = useCallback(
    (index: number, value: number) => {
      setMemory((mem: number[]) => {
        mem[index] = value;
        return mem;
      });
    },
    [memory]
  );
  return { memory, getItem, setItem };
}
