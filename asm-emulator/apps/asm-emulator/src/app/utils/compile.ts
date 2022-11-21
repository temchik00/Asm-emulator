import { CommandCode } from '../enums/commandCode';
import { CommandDescription } from './commandDescriptions';

export function compile(dataSource: string, commandSource: string) {
  const { dataValues: data, variables } = getDataValues(dataSource);
  const code = getCommandValues(commandSource, variables);

  return { data, code };
}

function getDataValues(dataSource: string): {
  dataValues: number[];
  variables: Map<string, number>;
} {
  let dataValues: Array<number> = [];
  let variables = new Map<string, number>();
  let dataLines = dataSource.split('\n');
  dataLines = dataLines.map((line) => line.trim());
  dataLines.forEach((line, index) => {
    if (line.length === 0 || line.startsWith('//')) return;
    const data = line.split(' ');
    if (data.length < 3) {
      throw new Error(`Not enough arguments in line ${index + 1}`);
    }

    const type = data[0].toLocaleLowerCase();
    data.shift();
    const name = data[0].toLocaleUpperCase();
    if (variables.has(name)) {
      throw new Error(`Variable ${name} in line ${index + 1} already exists`);
    }
    variables.set(name, dataValues.length);
    if (type === 'int') {
      const value = parseInt(data[1]);
      if (isNaN(value)) {
        throw new Error(`Invalid value in line ${index + 1}`);
      }
      dataValues.push(value);
    } else if (type === 'vec') {
      const values = data.slice(1).map((value) => parseInt(value));
      if (values.some((value) => isNaN(value))) {
        throw new Error(`Invalid value in line ${index + 1}`);
      }
      dataValues.push(...[values.length, ...values]);
    } else {
      throw new Error(`Unknown type ${type} in line ${index + 1}`);
    }
  });
  return { dataValues, variables };
}

function getCommandValues(
  commandSource: string,
  variables: Map<string, number>
): Array<number> {
  let labels = new Map<string, number>();
  let codes: number[] = [];
  let commandLines = commandSource.split('\n');
  let commandCount = 0;
  commandLines = commandLines.map((line) => line.trim());
  commandLines.forEach((line, index) => {
    if (line.length === 0 || line.startsWith('//')) return;
    const commands = line.split(' ');
    if (commands[0].endsWith(':')) {
      const label = commands[0].slice(0, -1).toLocaleUpperCase();
      if (CommandCode[<CommandCode>(<unknown>label)] !== undefined) {
        throw new Error(`Label ${label} is a command in line ${index + 1}`);
      }
      if (labels.has(label)) {
        throw new Error(`Label ${label} in line ${index + 1} already exists`);
      }
      if (variables.has(label)) {
        throw new Error(`Label ${label} in line ${index + 1} is a variable`);
      }
      labels.set(label, commandCount);
      commands.shift();
    }
    commandCount += commands.length;
  });

  commandLines.forEach((line, index) => {
    if (line.length === 0 || line.startsWith('//')) return;
    let commands = line.split(' ');
    if (commands[0].endsWith(':')) {
      commands.shift();
    }
    let commandName = commands[0].toLocaleUpperCase();
    let command: string | CommandCode | undefined =
      CommandCode[<CommandCode>(<unknown>commandName)];
    if (command === undefined) {
      throw new Error(`Unknown command ${commandName} in line ${index + 1}`);
    }
    command = <CommandCode>parseInt(command);
    codes.push(command);
    commands.shift();
    const params = CommandDescription[command].params;
    if (commands.length !== params.length) {
      throw new Error(`Invalid number of parameters in line ${index + 1}`);
    }
    params.forEach((param, paramIndex) => {
      let value = commands[paramIndex].toLocaleUpperCase();
      if (param.type === 'label') {
        if (!labels.has(value)) {
          throw new Error(`Unknown label ${value} in line ${index + 1}`);
        }
        const intValue = <number>labels.get(value);
        codes.push(intValue);
      } else {
        let intValue = parseInt(value);
        if (isNaN(intValue)) {
          if (!variables.has(value)) {
            throw new Error(
              `Unknown variable or invalid value ${value} in line ${index + 1}`
            );
          }
          intValue = <number>variables.get(value);
        }
        codes.push(intValue);
      }
    });
  });
  return codes;
}

export function getVariablesSet(dataSource: string) {
  let variables = new Set<string>();
  let dataLines = dataSource.trim().split('\n');
  dataLines = dataLines.map((line) => line.trim());
  dataLines.forEach((line, index) => {
    if (line.length === 0 || line.startsWith('//')) return;
    const data = line.split(' ');
    if (data.length < 2) return;
    data.shift();

    const name = data[0].toLocaleUpperCase();
    variables.add(name);
  });
  return variables;
}

export function getLabelsSet(commandSource: string) {
  let labels = new Set<string>();
  let commandLines = commandSource.trim().split('\n');
  commandLines = commandLines.map((line) => line.trim());
  commandLines.forEach((line, index) => {
    if (line.length === 0 || line.startsWith('//')) return;
    let commands = line.split(' ');
    if (commands[0].endsWith(':')) {
      const label = commands[0].slice(0, -1).toLocaleUpperCase();
      labels.add(label);
    }
  });
  return labels;
}
