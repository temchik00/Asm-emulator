import { memo } from 'react';
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
    return (
      <>
        <div>{props.active ? '→' : ''}</div>
        <div>{props.index}</div>
        <div>
          {props.command in CommandDescription
            ? CommandDescription[props.command as CommandCode].name
            : 'number'}
        </div>
        <div>{toBinary(props.command)}</div>
        <div>{toHex(props.command)}</div>
        <div>{props.command}</div>
      </>
    );
  }
);

export function CommandsList(props: CommandsListProps) {
  return (
    <div className={styles['container']}>
      <h3>Commands realted memory</h3>
      <div className={styles['vars']}>
        <span>PC: {props.pc}</span>
        <span>Counter: {props.counter}</span>
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
