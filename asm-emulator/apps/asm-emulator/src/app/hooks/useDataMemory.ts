import { useCallback, useState } from 'react';

export function useDataMemory() {
  const [memory, setMemory] = useState<number[]>([]);

  const push = useCallback(
    (value: number) => {
      setMemory((mem: number[]) => [value, ...mem]);
    },
    [memory]
  );

  const pop = useCallback((amount: number) => {
    const value = memory.slice(0, amount);
    setMemory(memory.slice(amount));
    return value;
  }, [memory]);

  return { memory, push, pop, setMemory };
}
