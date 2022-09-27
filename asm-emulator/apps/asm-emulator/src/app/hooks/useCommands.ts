import { useCallback, useMemo } from 'react';
import { CommandCode } from '../enums/commandCode';

export function useCommands(
  memoryPush: (value: number) => void,
  memoryPop: (amount: number) => number[],
  pc: number,
  commandMemory: number[]
) {
  const push = useCallback(
    (pc: number, commandMemory: number[]) => {
      pc += 1;
      const value = commandMemory[pc];
      memoryPush(value);
      return pc;
    },
    [memoryPush]
  );

  const pop = useCallback(
    (pc: number) => {
      memoryPop(1);
      return pc;
    },
    [memoryPop]
  );

  const add = useCallback(
    (pc: number) => {
      const [val1, val2] = memoryPop(2);
      memoryPush(val1 + val2);
      return pc;
    },
    [memoryPush, memoryPop]
  );

  const subtruct = useCallback(
    (pc: number) => {
      const [val1, val2] = memoryPop(2);
      memoryPush(val1 - val2);
      return pc;
    },
    [memoryPush, memoryPop]
  );

  const commands = useMemo((): Map<CommandCode, () => number> => {
    let map = new Map<CommandCode, () => number>();
    map.set(CommandCode.Push, () => push(pc, commandMemory));
    map.set(CommandCode.Pop, () => pop(pc));
    map.set(CommandCode.Add, () => add(pc));
    map.set(CommandCode.Sub, () => subtruct(pc));
    return map;
  }, [pc, commandMemory, push, pop, add, subtruct]);
  return { commands };
}
