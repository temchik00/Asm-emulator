import styles from './stack-list.module.scss';

/* eslint-disable-next-line */
export interface StackListProps {
  memory: number[];
}

export function StackList(props: StackListProps) {
  return (
    <div className={styles['container']}>
      <h3>Stack</h3>
      <div className={styles['table']}>
        {props.memory.map((element, index) => (
          <div key={index}>{element}</div>
        ))}
      </div>
    </div>
  );
}

export default StackList;
