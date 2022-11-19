import { useState } from 'react';

export function useCommandMemory() {
  const [pc, setPc] = useState<number>(0);
  const [counter, setCounter] = useState<number>(0);
  const [commandMemory, setCommandMemory] = useState<number[]>([]);

  return { pc, setPc, commandMemory, setCommandMemory, counter, setCounter };
}
