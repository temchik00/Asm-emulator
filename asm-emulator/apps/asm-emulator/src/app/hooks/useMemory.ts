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
  const pushItem = useCallback(
    (value: number) => {
      setMemory((memory) => {
        return [...memory, value];
      });
    },
    [memory]
  );

  const pushItems = useCallback(
    (values: number[]) => {
      setMemory((memory) => [...memory, ...values]);
    },
    [memory]
  );

  const clearMemory = useCallback(() => {
    setMemory([]);
  }, [memory]);

  return { memory, getItem, setItem, pushItem, pushItems, clearMemory };
}
