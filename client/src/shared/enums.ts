// src/colors.ts
export enum Colors {
  Red = "red",
  Yellow = "yellow",
  Green = "green",
}

export enum Pages {
  Summary = 0,
  Transactions = 1,
  Invoices = 2,
}

export enum Config {
  Threshold = 100, // better in env
}

export enum TransactionType {
  AR = "AR",
  AP = "AP",
}

export enum Status {
  PAID = "PAID",
  NOT_PAID = "NOT_PAID",
}
