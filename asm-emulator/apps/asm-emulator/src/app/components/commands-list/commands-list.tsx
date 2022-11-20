import { memo, useMemo } from 'react';
import { CommandCode } from '../../enums/commandCode';
import { CommandDescription } from '../../utils/commandDescriptions';
import { toBinary } from '../../utils/toBinary';
import { toHex } from '../../utils/toHex';
import styles from './commands-list.module.scss';

/* eslint-disable-next-line */
export interface CommandsListProps {
  pc: number;
  commands: number[];
  counter: number;
}

const Command = memo(
  (props: { active: boolean; index: number; command: number }) => {
    const cls = useMemo(() => {
      return `${styles['table-val']} ${
        props.index % 2 === 1 ? styles['table-val-light'] : ''
      }`;
    }, [props.index]);

    return (
      <>
        <div>{props.active ? '→' : ''}</div>
        <div className={cls}>{props.index}</div>
        <div className={cls}>
          {props.command in CommandDescription
            ? CommandDescription[props.command as CommandCode].name
            : 'number'}
        </div>
        <div className={cls}>{toBinary(props.command)}</div>
        <div className={cls}>{toHex(props.command)}</div>
        <div className={cls}>{props.command}</div>
      </>
    );
  }
);

export function CommandsList(props: CommandsListProps) {
  return (
    <div className={styles['container']}>
      <h3>Commands realted memory</h3>
      <div className={styles['vars']}>
        <span>
          PC: <span className={styles['value']}>{props.pc}</span>
        </span>
        <span>
          Counter: <span className={styles['value']}>{props.counter}</span>
        </span>
      </div>
      <div className={styles['table']}>
        <div></div>
        <h4>№</h4>
        <h4>Name</h4>
        <h4>2</h4>
        <h4>16</h4>
        <h4>10</h4>

        {props.commands.map((element, index) => (
          <Command
            key={index}
            active={index === props.pc}
            command={element}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}

export default CommandsList;
