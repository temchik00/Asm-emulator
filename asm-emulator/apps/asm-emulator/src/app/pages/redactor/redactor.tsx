import { useCallback, useEffect, useMemo, useState } from 'react';
import CodeEditor from '../../components/code-editor/code-editor';
import { CommandDescription } from '../../utils/commandDescriptions';
import { getLabelsSet, getVariablesSet } from '../../utils/compile';
import styles from './redactor.module.scss';

/* eslint-disable-next-line */
export interface RedactorProps {
  data: string;
  code: string;
  error: string | undefined;
  setData: (data: string) => void;
  setCode: (code: string) => void;
  compileAll: () => void;
}

export function Redactor(props: RedactorProps) {
  const [variables, setVariables] = useState<Set<string>>(new Set<string>());
  const [labels, setLabels] = useState<Set<string>>(new Set<string>());
  const types = new Set(['INT', 'VEC']);
  const commands = useMemo(() => {
    return new Set(
      Object.values(CommandDescription).map((command) => command.name.toLocaleUpperCase())
    );
  }, [CommandDescription]);

  useEffect(() => {
    const variables = getVariablesSet(props.data);
    setVariables(variables);
  }, [props.data]);

  useEffect(() => {
    const labels = getLabelsSet(props.code);
    setLabels(labels);
  }, [props.code]);

  const save = useCallback(() => {
    const dataLines = props.data.split('\n').length;
    const blob = new Blob(
      [dataLines.toString(), '\n', props.data, '\n', props.code],
      { type: 'text/plain' }
    );
    let url = window.URL.createObjectURL(blob);
    let link = document.createElement('a');
    link.href = url;
    link.download = 'program.zasm';
    link.click();
    setTimeout(() => {
      window.URL.revokeObjectURL(url);
      link.remove();
    }, 100);
  }, [props.data, props.code]);

  const load = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = false;
    input.accept = '.zasm';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const text = (e.target as FileReader).result as string;
          const lines = text.split('\n');
          const dataLines = parseInt(lines[0]);
          const data = lines.slice(1, dataLines + 1).join('\n');
          const code = lines.slice(dataLines + 1).join('\n');
          props.setData(data);
          props.setCode(code);
        };
        reader.readAsText(file);
      }
    };
    input.click();
  }, [props.setData, props.setCode]);

  const highlightData = useCallback(
    (word: string) => {
      word = word.toLocaleUpperCase();
      if (types.has(word)) {
        return 'editor-type';
      } else if (variables.has(word)) {
        return 'editor-variable';
      } else {
        return 'editor-default';
      }
    },
    [variables]
  );

  const highlightCode = useCallback(
    (word: string) => {
      word = word.replace(':', '').toLocaleUpperCase();

      if (commands.has(word)) {
        return 'editor-command';
      } else if (labels.has(word)) {
        return 'editor-label';
      } else if (variables.has(word)) {
        return 'editor-variable';
      } else {
        return 'editor-default';
      }
    },
    [labels, variables, commands]
  );

  return (
    <div className={styles['container']}>
      <div className={styles['buttons-container']}>
        <button className={styles['file-button']} onClick={save}>
          Save
        </button>
        <button className={styles['file-button']} onClick={load}>
          Load
        </button>
      </div>
      <label htmlFor="data" className={styles['label']}>
        Data
      </label>
      <CodeEditor
        value={props.data}
        onChange={(e) => {
          props.setData(e.target.value);
        }}
        highlight={highlightData}
        className={styles['data-input']}
        id="data"
      />
      <label htmlFor="commands" className={styles['label']}>
        Code
      </label>
      <CodeEditor
        value={props.code}
        onChange={(e) => {
          props.setCode(e.target.value);
        }}
        highlight={highlightCode}
        className={styles['commands-input']}
        id="commands"
      />
      {props.error && (
        <div className={styles['error-message']}>{props.error}</div>
      )}
      <button className={styles['compile-button']} onClick={props.compileAll}>
        Compile
      </button>
    </div>
  );
}

export default Redactor;
