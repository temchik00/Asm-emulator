import styles from './memory-list.module.scss';

/* eslint-disable-next-line */
export interface MemoryListProps {
  memory: number[];
}

export function MemoryList(props: MemoryListProps) {
  return (
    <div className={styles['container']}>
      <h3>Memory</h3>
      <ol>
        {props.memory.map((element, index) => (
          <li key={index}>{element}</li>
        ))}
      </ol>
    </div>
  );
}

export default MemoryList;
