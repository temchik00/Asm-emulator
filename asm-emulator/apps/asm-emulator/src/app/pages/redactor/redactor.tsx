import { useCallback, useState } from 'react';
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
      <div className={styles['input-block']}>
        <label htmlFor="data">Data</label>
        <textarea
          value={props.data}
          onChange={(e) => {
            props.setData(e.target.value);
          }}
          className={styles['data-input']}
          id="data"
        ></textarea>
      </div>
      <div className={`${styles['input-block']} ${styles['code-block']}`} style={{flex: '1 1 auto'}}>
        <label htmlFor="commands">Code</label>
        <textarea
          value={props.code}
          onChange={(e) => {
            props.setCode(e.target.value);
          }}
          className={styles['commands-input']}
          id="commands"
        ></textarea>
      </div>
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
