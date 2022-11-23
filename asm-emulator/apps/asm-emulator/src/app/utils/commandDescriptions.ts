import { CommandCode } from '../enums/commandCode';

export const CommandDescription = {
  [CommandCode.PUSH]: {
    name: 'Push',
    description: 'Pushes a value onto the top of a stack',
    params: [
      { name: 'value', description: 'Value to add on top of a stack', type: 'int' },
    ],
  },
  [CommandCode.POP]: {
    name: 'Pop',
    description: 'Pops a value from the top of a stack',
    params: [],
  },
  [CommandCode.ADD]: {
    name: 'Add',
    description:
      'Adds two values from the top of a stack and replaces them with the result',
    params: [],
  },
  [CommandCode.SUB]: {
    name: 'Sub',
    description:
      'Subtracts two values from the top of a stack and replaces them with the result',
    params: [],
  },
  [CommandCode.ADC]: {
    name: 'Adc',
    description:
      'Adds carry flag and two values from the top of a stack and replaces them with the result',
    params: [],
  },
  [CommandCode.MUL]: {
    name: 'Mul',
    description:
      'Multiplies two values from the top of a stack and replaces them with the result',
    params: [],
  },
  [CommandCode.READ]: {
    name: 'Read',
    description:
      'Reads a value from the memory by addres from top of a stack and pushes it onto the top of a stack',
    params: [],
  },
  [CommandCode.WRITE]: {
    name: 'Write',
    description:
      'Writes a value from the top of a stack to the memory by address from the top of a stack',
    params: [],
  },
  [CommandCode.LDC]: {
    name: 'LDC',
    description: 'Puts a value in the counter register',
    params: [],
  },
  [CommandCode.STC]: {
    name: 'STC',
    description:
      'Pushes value from the counter register onto the top of a stack',
    params: [],
  },
  [CommandCode.CMP]: {
    name: 'Cmp',
    description: 'Compares two values from the top of a stack',
    params: [],
  },
  [CommandCode.SWAP]: {
    name: 'Swap',
    description: 'Swaps two values from the top of a stack',
    params: [],
  },
  [CommandCode.RSC]: {
    name: 'RsC',
    description: 'Sets counter register to zero',
    params: [],
  },
  [CommandCode.INCC]: {
    name: 'IncC',
    description: 'Increments counter register',
    params: [],
  },
  [CommandCode.DECC]: {
    name: 'DecC',
    description: 'Decrements counter register',
    params: [],
  },
  [CommandCode.CMPC]: {
    name: 'CmpC',
    description:
      'Compares counter register with a value from the top of a stack',
    params: [],
  },
  [CommandCode.JMP]: {
    name: 'Jmp',
    description: 'Jumps to a command by specified address',
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
    description: 'Jumps to a command by specified address if zero flag is set',
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
    description:
      'Jumps to a command by specified address if zero flag is not set',
    params: [
      {
        name: 'Label',
        description: 'Address to jump to if zero flag is not set',
        type: 'label',
      },
    ],
  },
  [CommandCode.INC]: {
    name: 'Inc',
    description: 'Increments a value from the top of a stack',
    params: [],
  },
  [CommandCode.ROR]: {
    name: 'Ror',
    description: 'Rotates "amount" values from the top of a stack to the right',
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
    description: 'Rotates "amount" values from the top of a stack to the left',
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
    description:
      'Rotates "amount" values from the top of a stack to the right "n" times',
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
    description:
      'Rotates "amount" values from the top of a stack to the left "n" times',
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
