import { CommandCode } from '../enums/commandCode';

export const CommandDescription = {
  [CommandCode.PUSH]: {
    name: 'Push',
    params: [
      { name: 'n', description: 'Value to add on top of a stack', type: 'int' },
    ],
  },
  [CommandCode.POP]: { name: 'Pop', params: [] },
  [CommandCode.ADD]: { name: 'Add', params: [] },
  [CommandCode.SUB]: { name: 'Sub', params: [] },
  [CommandCode.ADC]: { name: 'Adc', params: [] },
  [CommandCode.MUL]: { name: 'Mul', params: [] },
  [CommandCode.READ]: { name: 'Read', params: [] },
  [CommandCode.WRITE]: { name: 'Write', params: [] },
  [CommandCode.LDC]: { name: 'LDC', params: [] },
  [CommandCode.STC]: { name: 'STC', params: [] },
  [CommandCode.CMP]: { name: 'Cmp', params: [] },
  [CommandCode.SWAP]: { name: 'Swap', params: [] },
  [CommandCode.RSC]: { name: 'RsC', params: [] },
  [CommandCode.INCC]: { name: 'IncC', params: [] },
  [CommandCode.DECC]: { name: 'DecC', params: [] },
  [CommandCode.CMPC]: { name: 'CmpC', params: [] },
  [CommandCode.JMP]: {
    name: 'Jmp',
    params: [
      {
        name: 'Label',
        description: 'Address to jump to',
        type: 'label',
      },
    ],
  },
  [CommandCode.JE]: {
    name: 'Je',
    params: [
      {
        name: 'Label',
        description: 'Address to jump to if zero flag is set',
        type: 'label',
      },
    ],
  },
  [CommandCode.JNE]: {
    name: 'Jne',
    params: [
      {
        name: 'Label',
        description: 'Address to jump to if zero flag is not set',
        type: 'label',
      },
    ],
  },
  [CommandCode.INC]: { name: 'Inc', params: [] },
  [CommandCode.ROR]: {
    name: 'Ror',
    params: [
      {
        name: 'amount',
        description: 'Amount of values to rotate',
        type: 'int',
      },
    ],
  },
  [CommandCode.ROL]: {
    name: 'Rol',
    params: [
      {
        name: 'amount',
        description: 'Amount of values to rotate',
        type: 'int',
      },
    ],
  },
  [CommandCode.RORN]: {
    name: 'RorN',
    params: [
      {
        name: 'amount',
        description: 'Amount of values to rotate',
        type: 'int',
      },
      {
        name: 'n',
        description: 'How many times to rotate',
        type: 'int',
      },
    ],
  },
  [CommandCode.ROLN]: {
    name: 'RolN',
    params: [
      {
        name: 'amount',
        description: 'Amount of values to rotate',
        type: 'int',
      },
      {
        name: 'n',
        description: 'How many times to rotate',
        type: 'int',
      },
    ],
  },
};
