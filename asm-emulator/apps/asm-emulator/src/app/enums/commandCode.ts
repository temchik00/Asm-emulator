export enum CommandCode {
  PUSH = 0x0,
  POP = 0x1,
  ADD = 0x2,
  SUB = 0x3,
  ADC = 0x4,
  MUL = 0x5,
  READ = 0x6,
  WRITE = 0x7,
  LDC = 0x8,
  STC = 0x9,
  CMP = 0xa,
  SWAP = 0xb,
  RSC = 0xc,
  INCC = 0xd,
  DECC = 0xe,
  CMPC = 0xf,
  JMP = 0x10,
  JE = 0x11,
  JNE = 0x12,
  INC = 0x13,
  DEC = 0x14,
  ROR = 0x15,
  ROL = 0x16,
  RORN = 0x17,
  ROLN = 0x18,
  DUP = 0x19,
}
