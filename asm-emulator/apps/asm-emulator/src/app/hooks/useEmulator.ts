import { useCallback, useEffect, useState } from 'react';
import { useCommandMemory } from './useCommandMemory';
import { useCommands } from './useCommands';
import { useMemory } from './useMemory';
import { useStackMemory } from './useStackMemory';

export function useEmulator() {
  const stack = useStackMemory();
  const { pc, setPc, commandMemory, setCommandMemory, counter, setCounter } =
    useCommandMemory();
  const { memory, getItem, setItem, pushItem, pushItems, clearMemory } =
    useMemory();
  const { commands } = useCommands(
    stack,
    pc,
    commandMemory,
    getItem,
    setItem,
    counter,
    setCounter
  );
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
    setTimeout(() => setExecuting(false), 5000);
  }, [executing]);

  useEffect(() => {
    if (executing) {
      if (pc >= commandMemory.length) setExecuting(false);
      else step();
    }
  }, [step, executing, pc, commandMemory]);

  return {
    memory,
    stack,
    commandMemory,
    pc,
    counter,
    step,
    setCommandMemory,
    execute,
    pushItem,
    pushItems,
    clearMemory
  };
}
