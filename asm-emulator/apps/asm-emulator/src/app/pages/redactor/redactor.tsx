import { useCallback, useState } from 'react';
import { compile } from '../../utils/compile';
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
  return (
    <div className={styles['container']}>
      <div className={styles['buttons-container']}>
        <button className={styles['file-button']}>Save</button>
        <button className={styles['file-button']}>Load</button>
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
      <div className={styles['input-block']}>
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
      {props.error && <div className={styles['error-message']}>{props.error}</div>}
      <button className={styles['compile-button']} onClick={props.compileAll}>
        Compile
      </button>
    </div>
  );
}

export default Redactor;
