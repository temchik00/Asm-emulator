import { useCallback, useMemo, useState } from 'react';
import { isBitSet, setBit } from '../utils/bitManipulation';

export function useStackMemory() {
  const [memory, setMemory] = useState<number[]>([]);
  const [flags, setFlags] = useState<number>(0);

  const carryFlag = useMemo(() => {
    return isBitSet(flags, 0);
  }, [flags]);

  const setCarryFlag = useCallback(
    (state: boolean) => {
      setFlags((current) => {
        return setBit(current, 0, state);
      });
    },
    [flags]
  );

  const zeroFlag = useMemo(() => {
    return isBitSet(flags, 1);
  }, [flags]);

  const setZeroFlag = useCallback(
    (state: boolean) => {
      setFlags((current) => {
        return setBit(current, 1, state);
      });
    },
    [flags]
  );

  const signFlag = useMemo(() => {
    return isBitSet(flags, 2);
  }, [flags]);

  const setSignFlag = useCallback(
    (state: boolean) => {
      setFlags((current) => {
        return setBit(current, 2, state);
      });
    },
    [flags]
  );

  const push = useCallback(
    (value: number) => {
      setMemory((mem: number[]) => [value, ...mem]);
    },
    [memory]
  );

  const pop = useCallback(
    (amount: number) => {
      const value = memory.slice(0, amount);
      setMemory(memory.slice(amount));
      return value;
    },
    [memory]
  );

  const peek = useCallback(
    (amount: number) => {
      return memory.slice(0, amount);
    },
    [memory]
  );

  return {
    memory,
    setMemory,
    push,
    pop,
    carryFlag,
    setCarryFlag,
    zeroFlag,
    setZeroFlag,
    signFlag,
    setSignFlag,
    flags,
    peek,
  };
}
