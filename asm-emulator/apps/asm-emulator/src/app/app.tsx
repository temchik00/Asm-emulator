import { useEffect } from 'react';
import CommandsList from './components/commands-list/commands-list';
import MemoryList from './components/memory-list/memory-list';
import { CommandCode } from './enums/commandCode';
import { useEmulator } from './hooks/useEmulator';

export function App() {
  const { memory, setCommandMemory, step, pc, commandMemory, execute } =
    useEmulator();
  useEffect(() => {
    setCommandMemory([
      CommandCode.Push,
      40,
      CommandCode.Push,
      50,
      CommandCode.Push,
      30,
      CommandCode.Add,
      CommandCode.Sub,
    ]);
  }, []);
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <MemoryList memory={memory} />
        <CommandsList pc={pc} commands={commandMemory} />
      </div>
      <button onClick={step}>Step</button>
      <button onClick={execute}>Execute</button>
    </>
  );
}

export default App;
