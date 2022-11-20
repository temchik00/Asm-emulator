import { memo } from 'react';
import styles from './memory-list.module.scss';

/* eslint-disable-next-line */
export interface MemoryListProps {
  memory: number[];
}

const MemoryItem = memo((props: { index: number; val: number }) => {
  return (
    <>
      <div className={styles['memory-id']}>{props.index}</div>
      <div className={styles['memory-val']}>{props.val}</div>
    </>
  );
});

export function MemoryList(props: MemoryListProps) {
  return (
    <div className={styles['container']}>
      <h3>Memory</h3>
      <div className={styles['memory-table']}>
        <h4 className={styles['memory-table-header']}>Pos</h4>
        <h4 className={styles['memory-table-header']}>Value</h4>
        {props.memory.map((element, index) => (
          <MemoryItem key={index} index={index} val={element} />
        ))}
      </div>
    </div>
  );
}

export default MemoryList;
