import { memo, useEffect, useMemo } from 'react';
import CommandsList from './components/commands-list/commands-list';
import MemoryList from './components/memory-list/memory-list';
import FlagList from './components/flag-list/flag-list';
import { CommandCode } from './enums/commandCode';
import { useEmulator } from './hooks/useEmulator';
import StackList from './components/stack-list/stack-list';

export function App() {
  const {
    memory,
    stack,
    pc,
    commandMemory,
    counter,
    setCommandMemory,
    step,
    execute,
    setItem,
  } = useEmulator();
  useEffect(() => {
    setItem(0, 9);
    setItem(1, 2);
    setItem(2, 4);
    setItem(3, 8);
    setItem(4, 16);
    setItem(5, 8);
    setItem(6, 4);
    setItem(7, 2);
    setItem(8, 4);
    setItem(9, 5);
    setCommandMemory([
      CommandCode.Push,
      0,
      CommandCode.Read,
      CommandCode.RsC,
      CommandCode.Push,
      0,
      CommandCode.Swap,

      CommandCode.Swap,
      CommandCode.IncC,
      CommandCode.STC,
      CommandCode.Read,
      CommandCode.Add,
      CommandCode.Swap,
      CommandCode.CmpC,
      CommandCode.Jne,
      6,
      CommandCode.Inc,
      CommandCode.Write,
    ]);
  }, []);
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

export default App;
