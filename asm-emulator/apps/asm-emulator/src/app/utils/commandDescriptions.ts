import { CommandCode } from '../enums/commandCode';

export const CommandDescription = {
  [CommandCode.Push]: { name: 'Push' },
  [CommandCode.Pop]: { name: 'Pop' },
  [CommandCode.Add]: { name: 'Add' },
  [CommandCode.Sub]: { name: 'Sub' },
  [CommandCode.Adc]: { name: 'Adc' },
  [CommandCode.Mul]: { name: 'Mul' },
  [CommandCode.Read]: { name: 'Read' },
  [CommandCode.Write]: { name: 'Write' },
  [CommandCode.LDC]: { name: 'LSC' },
  [CommandCode.STC]: { name: 'STC' },
  [CommandCode.Cmp]: { name: 'Cmp' },
  [CommandCode.Swap]: { name: 'Swap' },
  [CommandCode.RsC]: { name: 'RsC' },
  [CommandCode.IncC]: { name: 'IncC' },
  [CommandCode.DecC]: { name: 'DecC' },
  [CommandCode.CmpC]: { name: 'CmpC' },
  [CommandCode.Jne]: { name: 'Jne' },
  [CommandCode.Inc]: { name: 'Inc' },
};
