import { useCallback, useState } from 'react';
import Emulator from './pages/emulator/emulator';
import Redactor from './pages/redactor/redactor';
import { compile } from './utils/compile';

export function App() {
  const [page, setPage] = useState<'emulator' | 'redactor'>('redactor');
  const [data, setData] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [compiledData, setCompiledData] = useState<Array<number>>([]);
  const [compiledCode, setCompiledCode] = useState<Array<number>>([]);
  const [error, setError] = useState<string | undefined>(undefined);
  const compileAll = useCallback(() => {
    try {
      const { data: compData, code: compCode } = compile(data, code);
      setError(undefined);
      setCompiledData(compData);
      setCompiledCode(compCode);
      setPage('emulator');
    } catch (err) {
      setError((err as Error).message);
    }
  }, [error, data, code, page]);

  const toEditor = useCallback(() => {
    setPage('redactor');
  }, [page]);

  return (
    <>
      {page === 'emulator' ? (
        <Emulator
          compiledData={compiledData}
          compiledCode={compiledCode}
          toEditor={toEditor}
        />
      ) : (
        <Redactor
          data={data}
          code={code}
          setData={setData}
          setCode={setCode}
          error={error}
          compileAll={compileAll}
        />
      )}
    </>
  );
}

export default App;
