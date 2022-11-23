import { memo, useCallback, useMemo, useState } from 'react';
import { CommandDescription } from '../../utils/commandDescriptions';
import styles from './handbook.module.scss';

export interface CommandProps {
  name: string;
  description: string;
  params: {
    name: string;
    description: string;
    type: string;
  }[];
}
function Command(props: CommandProps) {
  const [expanded, setExpanded] = useState<boolean>(false);
  const toggleExpanded = useCallback(() => {
    setExpanded((expanded) => !expanded);
  }, [expanded]);

  const paramsList = useMemo(() => {
    return (
      <ul className={styles['entry-params-list']}>
        {props.params.map((param, index) => (
          <li key={index}>
            <span className={styles['entry-params-name']}>{param.name} - </span>
            <span className={styles['entry-params-description']}>
              {param.description}
            </span>
          </li>
        ))}
      </ul>
    );
  }, [props.params]);

  const paramsView = useMemo(() => {
    if (props.params.length === 0)
      return (
        <div className={styles['entry-params-header']}>
          No parameters needed
        </div>
      );
    return (
      <>
        <div className={styles['entry-params-header']}>Parameters: </div>
        {paramsList}
      </>
    );
  }, [props.params, paramsList]);

  return (
    <div className={styles['entry']}>
      <div className={styles['entry-header']} onClick={toggleExpanded}>
        {props.name}
      </div>
      <div
        className={`${styles['entry-body']} ${
          expanded ? styles['entry-body-expanded'] : ''
        }`}
      >
        <div className={styles['entry-description']}>{props.description}</div>
        <div className={styles['entry-params']}>{paramsView}</div>
      </div>
    </div>
  );
}

/* eslint-disable-next-line */
export interface HandbookProps {}

export function Handbook(props: HandbookProps) {
  const [filter, setFilter] = useState<string>('');
  const commands = useMemo(() => {
    return Object.values(CommandDescription).filter((command) => {
      return (
        command.description
          .toLocaleUpperCase()
          .includes(filter.toLocaleUpperCase()) ||
        command.name.toLocaleUpperCase().includes(filter.toLocaleUpperCase()) ||
        filter === ''
      );
    });
  }, [filter, CommandDescription]);

  const commandsList = useMemo(() => {
    return commands.map((command, index) => {
      return <Command key={index} {...command} />;
    });
  }, [commands]);
  return (
    <div className={styles['container']}>
      <label htmlFor="search" className={styles['label']}>
        Search
      </label>
      <input
        value={filter}
        onChange={(e) => {
          setFilter(e.target.value);
        }}
        type="text"
        id="search"
        className={styles['search']}
      />
      <div className={styles['label']}>Results</div>
      <div className={`scrollbar ${styles['results']}`}>
        {commands.length > 0 ? (
          commandsList
        ) : (
          <div className={styles['no-entries']}>No results</div>
        )}
      </div>
    </div>
  );
}

export default Handbook;
