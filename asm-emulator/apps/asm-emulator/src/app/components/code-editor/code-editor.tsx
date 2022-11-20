import { useMemo } from 'react';
import styles from './code-editor.module.scss';

/* eslint-disable-next-line */
export interface CodeEditorProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  id?: string;
}

export function CodeEditor(props: CodeEditorProps) {
  const lineNumbers = useMemo(() => {
    const lines = props.value.split('\n');
    return lines.map((_, i) => i + 1);
  }, [props.value]);
  return (
    <div
      className={`scrollbar ${styles['container']} ${
        props.className ? props.className : ''
      }`}
    >
      <div className={styles['wrapper']}>
        <div className={styles['numbers']}>
          {lineNumbers.map((line) => (
            <div key={line} className={styles['number']}>
              {line}
            </div>
          ))}
        </div>
        <textarea
          className={`${styles['editor']}`}
          value={props.value}
          onChange={(e) => props.onChange(e)}
          id={props.id}
        />
      </div>
    </div>
  );
}

export default CodeEditor;
