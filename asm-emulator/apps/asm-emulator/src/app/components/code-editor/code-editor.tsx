import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './code-editor.module.scss';

/* eslint-disable-next-line */
export interface CodeEditorProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  highlight: (word: string) => string;
  className?: string;
  id?: string;
}

export function CodeEditor(props: CodeEditorProps) {
  const [highlighted, setHighlighted] = useState<React.ReactNode[]>([]);

  const lineNumbers = useMemo(() => {
    const lines = props.value.split('\n');
    return lines.map((_, i) => i + 1);
  }, [props.value]);

  const highlight = useCallback(
    (code: string) => {
      const lines = code.split('\n');
      let highlight: React.ReactNode[] = [];
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].trim().startsWith('//')) {
          highlight.push(
            <span key={i} className={styles['editor-comment']}>
              {lines[i]}
            </span>
          );
          continue;
        }
        let words = lines[i].trim().split(' ');
        let line = [];
        if (words[0].length === 0) {
          line.push(' ');
          highlight.push(<div key={i}>{line}</div>);
          continue;
        }
        for (let j = 0; j < words.length; j++) {
          const word = words[j];
          line.push(
            <span className={styles[props.highlight(word)]}>{word}</span>
          );

          if (j < words.length - 1) {
            line.push(' ');
          }
        }
        highlight.push(<div key={i}>{line}</div>);
      }
      return highlight;
    },
    [props.highlight]
  );

  useEffect(() => {
    setHighlighted(highlight(props.value));
  }, [props.value, highlight]);

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
        <pre className={styles['editor-wrapper']}>
          <textarea
            className={`${styles['editor']}`}
            value={props.value}
            spellCheck={false}
            onChange={(e) => {
              props.onChange(e);
            }}
            id={props.id}
          />
          <div className={styles['editor-presentation']}>{highlighted}</div>
        </pre>
      </div>
    </div>
  );
}

export default CodeEditor;
