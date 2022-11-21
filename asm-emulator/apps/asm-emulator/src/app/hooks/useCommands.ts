import { useCallback, useMemo } from 'react';
import { environment } from '../../environments/environment';
import { CommandCode } from '../enums/commandCode';
import { arrayRotate } from '../utils/arrayRotate';
import { enableBit, splitNumber } from '../utils/bitManipulation';

export function useCommands(
  {
    push: stackPush,
    pop: stackPop,
    carryFlag,
    setCarryFlag,
    zeroFlag,
    setZeroFlag,
    signFlag,
    setSignFlag,
    peek: stackPeek,
  }: {
    memory: number[];
    setMemory: React.Dispatch<React.SetStateAction<number[]>>;
    push: (value: number) => void;
    pop: (amount: number) => number[];
    carryFlag: boolean;
    setCarryFlag: (state: boolean) => void;
    zeroFlag: boolean;
    setZeroFlag: (state: boolean) => void;
    signFlag: boolean;
    setSignFlag: (state: boolean) => void;
    peek: (amount: number) => number[];
  },
  pc: number,
  commandMemory: number[],
  getMemoryItem: (index: number) => number,
  setMemoryItem: (index: number, value: number) => void,
  counter: number,
  setCounter: React.Dispatch<React.SetStateAction<number>>
) {
  const push = useCallback(
    (pc: number, commandMemory: number[]) => {
      pc += 1;
      const value = commandMemory[pc];
      stackPush(value);
      return pc;
    },
    [stackPush]
  );

  const pop = useCallback(
    (pc: number) => {
      stackPop(1);
      return pc;
    },
    [stackPop]
  );

  const add = useCallback(
    (pc: number) => {
      const [val1, val2] = stackPop(2);
      const result = val1 + val2;
      const overflow = Math.abs(result) >= enableBit(0, environment.bitDepth);
      setCarryFlag(overflow);
      setSignFlag(result < 0);
      if (overflow) {
        const [lower, upper] = splitNumber(result, environment.bitDepth);
        stackPush(lower);
        stackPush(upper);
      } else stackPush(result);
      return pc;
    },
    [stackPush, stackPop, setCarryFlag, setSignFlag]
  );

  const adc = useCallback(
    (pc: number) => {
      const [val1, val2] = stackPop(2);
      let result = val1 + val2;
      if (carryFlag) result += enableBit(0, environment.bitDepth);
      const overflow = Math.abs(result) >= enableBit(0, environment.bitDepth);
      setCarryFlag(overflow);
      setSignFlag(result < 0);
      if (overflow) {
        const [lower, upper] = splitNumber(result, environment.bitDepth);
        stackPush(lower);
        stackPush(upper);
      } else stackPush(result);
      return pc;
    },
    [stackPush, stackPop, setCarryFlag, setSignFlag]
  );

  const mul = useCallback(
    (pc: number) => {
      const [val1, val2] = stackPop(2);
      const result = val1 * val2;
      const overflow = Math.abs(result) >= enableBit(0, environment.bitDepth);
      setCarryFlag(overflow);
      setSignFlag(result < 0);
      const [lower, upper] = splitNumber(result, environment.bitDepth);
      stackPush(lower);
      stackPush(upper);
      return pc;
    },
    [stackPush, stackPop, setCarryFlag, setSignFlag]
  );

  const subtruct = useCallback(
    (pc: number) => {
      const [val1, val2] = stackPop(2);
      stackPush(val1 - val2);
      return pc;
    },
    [stackPush, stackPop]
  );

  const read = useCallback(
    (pc: number) => {
      const address = stackPop(1)[0];
      const val = getMemoryItem(address);
      stackPush(val);
      return pc;
    },
    [stackPop, stackPush, getMemoryItem]
  );

  const write = useCallback(
    (pc: number) => {
      const [address, val] = stackPop(2);
      setMemoryItem(address, val);
      return pc;
    },
    [stackPop, setMemoryItem]
  );

  const ldc = useCallback(
    (pc: number) => {
      const value = stackPop(1)[0];
      setCounter(value);
      return pc;
    },
    [stackPeek, setCounter]
  );

  const stc = useCallback(
    (pc: number) => {
      const value = counter;
      stackPush(value);
      return pc;
    },
    [stackPush, counter]
  );

  const cmp = useCallback(
    (pc: number) => {
      const [val1, val2] = stackPeek(2);
      if (val1 === val2) setZeroFlag(true);
      else setZeroFlag(false);
      if (val1 < val2) setSignFlag(true);
      else setSignFlag(false);
      return pc;
    },
    [stackPeek]
  );

  const swap = useCallback(
    (pc: number) => {
      const [val1, val2] = stackPop(2);
      stackPush(val1);
      stackPush(val2);
      return pc;
    },
    [stackPush, stackPop]
  );

  const rsc = useCallback(
    (pc: number) => {
      setCounter(0);
      return pc;
    },
    [setCounter]
  );

  const inc = useCallback(
    (pc: number) => {
      const value = stackPop(1)[0];
      stackPush(value + 1);
      return pc;
    },
    [stackPop, stackPush]
  );

  const incc = useCallback(
    (pc: number) => {
      setCounter((counter) => counter + 1);
      return pc;
    },
    [counter, setCounter]
  );

  const decc = useCallback(
    (pc: number) => {
      setCounter((counter) => counter - 1);
      return pc;
    },
    [counter, setCounter]
  );

  const cmpc = useCallback(
    (pc: number) => {
      const val1 = counter;
      const val2 = stackPeek(1)[0];
      if (val1 === val2) setZeroFlag(true);
      else setZeroFlag(false);
      if (val1 < val2) setSignFlag(true);
      else setSignFlag(false);
      return pc;
    },
    [stackPeek, setZeroFlag, setSignFlag, counter]
  );

  const jne = useCallback(
    (pc: number, commandMemory: number[]) => {
      pc += 1;
      const address = commandMemory[pc];
      if (!zeroFlag) pc = address - 1;
      setZeroFlag(false);
      setSignFlag(false);
      return pc;
    },
    [zeroFlag, setZeroFlag, setSignFlag]
  );

  const jmp = useCallback((pc: number, commandMemory: number[]) => {
    pc += 1;
    const address = commandMemory[pc];
    pc = address - 1;
    return pc;
  }, []);

  const je = useCallback(
    (pc: number, commandMemory: number[]) => {
      pc += 1;
      const address = commandMemory[pc];
      if (zeroFlag) pc = address - 1;
      setZeroFlag(false);
      setSignFlag(false);
      return pc;
    },
    [zeroFlag, setZeroFlag, setSignFlag]
  );

  const ror = useCallback(
    (pc: number, commandMemory: number[]) => {
      pc += 1;
      const amount = commandMemory[pc];
      let arr = stackPop(amount);
      arr = arrayRotate(arr, true);
      arr.reverse().forEach((val) => stackPush(val));
      return pc;
    },
    [stackPop, stackPush]
  );

  const rol = useCallback(
    (pc: number, commandMemory: number[]) => {
      pc += 1;
      const amount = commandMemory[pc];
      let arr = stackPop(amount);
      arr = arrayRotate(arr);
      arr.reverse().forEach((val) => stackPush(val));
      return pc;
    },
    [stackPop, stackPush]
  );

  const rorn = useCallback(
    (pc: number, commandMemory: number[]) => {
      pc += 1;
      const amount = commandMemory[pc];
      let arr = stackPop(amount);
      pc += 1;
      const n = commandMemory[pc];
      for (let i = 0; i < n; i++) {
        arr = arrayRotate(arr, true);
      }
      arr.reverse().forEach((val) => stackPush(val));
      return pc;
    },
    [stackPop, stackPush]
  );

  const roln = useCallback(
    (pc: number, commandMemory: number[]) => {
      pc += 1;
      const amount = commandMemory[pc];
      let arr = stackPop(amount);
      pc += 1;
      const n = commandMemory[pc];
      for (let i = 0; i < n; i++) {
        arr = arrayRotate(arr);
      }
      arr.reverse().forEach((val) => stackPush(val));
      return pc;
    },
    [stackPop, stackPush]
  );

  const commands = useMemo((): Map<CommandCode, () => number> => {
    let map = new Map<CommandCode, () => number>();
    map.set(CommandCode.PUSH, () => push(pc, commandMemory));
    map.set(CommandCode.POP, () => pop(pc));
    map.set(CommandCode.ADD, () => add(pc));
    map.set(CommandCode.SUB, () => subtruct(pc));
    map.set(CommandCode.ADC, () => adc(pc));
    map.set(CommandCode.MUL, () => mul(pc));
    map.set(CommandCode.READ, () => read(pc));
    map.set(CommandCode.WRITE, () => write(pc));
    map.set(CommandCode.LDC, () => ldc(pc));
    map.set(CommandCode.STC, () => stc(pc));
    map.set(CommandCode.CMP, () => cmp(pc));
    map.set(CommandCode.SWAP, () => swap(pc));
    map.set(CommandCode.RSC, () => rsc(pc));
    map.set(CommandCode.INCC, () => incc(pc));
    map.set(CommandCode.DECC, () => decc(pc));
    map.set(CommandCode.CMPC, () => cmpc(pc));
    map.set(CommandCode.JNE, () => jne(pc, commandMemory));
    map.set(CommandCode.JMP, () => jmp(pc, commandMemory));
    map.set(CommandCode.INC, () => inc(pc));
    map.set(CommandCode.JE, () => je(pc, commandMemory));
    map.set(CommandCode.ROR, () => ror(pc, commandMemory));
    map.set(CommandCode.ROL, () => rol(pc, commandMemory));
    map.set(CommandCode.RORN, () => rorn(pc, commandMemory));
    map.set(CommandCode.ROLN, () => roln(pc, commandMemory));
    return map;
  }, [
    pc,
    commandMemory,
    push,
    pop,
    add,
    subtruct,
    adc,
    mul,
    read,
    write,
    ldc,
    stc,
    cmp,
    swap,
    rsc,
    incc,
    decc,
    cmpc,
    jne,
    jmp,
    inc,
    je,
    ror,
    rol,
    rorn,
    roln,
  ]);
  return { commands };
}
