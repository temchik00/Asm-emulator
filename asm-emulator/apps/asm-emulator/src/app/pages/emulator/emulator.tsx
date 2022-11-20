import { useEffect, useMemo } from 'react';
import CommandsList from '../../components/commands-list/commands-list';
import FlagList from '../../components/flag-list/flag-list';
import MemoryList from '../../components/memory-list/memory-list';
import StackList from '../../components/stack-list/stack-list';
import { useEmulator } from '../../hooks/useEmulator';

/* eslint-disable-next-line */
export interface EmulatorProps {
  compiledData: Array<number>;
  compiledCode: Array<number>;
}

export function Emulator(props: EmulatorProps) {
  const {
    memory,
    stack,
    pc,
    commandMemory,
    counter,
    setCommandMemory,
    step,
    execute,
    pushItem,
    pushItems,
    clearMemory,
  } = useEmulator();
  useEffect(() => {
    clearMemory();
    pushItems(props.compiledData);
    setCommandMemory(props.compiledCode);
  }, [props.compiledCode, props.compiledData]);
  const flags = useMemo(() => {
    return [
      { state: stack.carryFlag, name: 'carry' },
      { state: stack.zeroFlag, name: 'zero' },
      { state: stack.signFlag, name: 'sign' },
    ];
  }, [stack]);
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <MemoryList memory={memory} />
        <StackList memory={stack.memory} />
        <FlagList flags={flags} binaryFlags={stack.flags} />
        <CommandsList pc={pc} commands={commandMemory} counter={counter} />
      </div>
      <button onClick={step}>Step</button>
      <button onClick={execute}>Execute</button>
    </>
  );
}

export default Emulator;
