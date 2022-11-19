import styles from './flag-list.module.scss';
import { memo } from 'react';
import { toBinary } from '../../utils/toBinary';

interface IFlag {
  state: boolean;
  name: string;
}

/* eslint-disable-next-line */
export interface FlagListProps {
  flags: IFlag[];
  binaryFlags: number;
}

const Flag = memo((props: IFlag) => {
  return (
    <>
      <div className={styles['flag-name']}>{props.name}: </div>
      <div className={styles['flag-val']}>{props.state ? 'True' : 'False'}</div>
    </>
  );
});

export function FlagList(props: FlagListProps) {
  return (
    <div className={styles['container']}>
      <h3>Flags</h3>
      <h4>Binary repr</h4>
      <div>{toBinary(props.binaryFlags)}</div>
      <h4>Individual flags</h4>
      <div className={styles['flag-table']}>
        {props.flags.map((element, index) => (
          <Flag key={index} {...element} />
        ))}
      </div>
    </div>
  );
}

export default FlagList;
