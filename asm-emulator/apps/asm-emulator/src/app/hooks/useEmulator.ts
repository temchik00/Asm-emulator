import { useCallback, useEffect, useState } from 'react';
import { useCommandMemory } from './useCommandMemory';
import { useCommands } from './useCommands';
import { useDataMemory } from './useDataMemory';

export function useEmulator() {
  const { memory, push: memoryPush, pop: memoryPop } = useDataMemory();
  const { pc, setPc, commandMemory, setCommandMemory } = useCommandMemory();
  const { commands } = useCommands(memoryPush, memoryPop, pc, commandMemory);
  const [executing, setExecuting] = useState<boolean>(false);

  const step = useCallback(() => {
    setPc((pc) => {
      if (pc >= commandMemory.length) return pc;
      const commandId = commandMemory[pc];
      const localPc = commands.get(commandId)?.();
      if (localPc !== undefined) return localPc + 1;
      else return pc + 1;
    });
  }, [pc, setPc, commandMemory, commands]);

  const execute = useCallback(() => {
    setExecuting(true);
    setTimeout(()=>setExecuting(false), 5000);
  }, [executing]);

  useEffect(() => {
    if (executing) {
      if (pc >= commandMemory.length) setExecuting(false);
      else step();
    }
  }, [step, executing, pc, commandMemory]);

  return { memory, commandMemory, pc, step, setCommandMemory, execute };
}
