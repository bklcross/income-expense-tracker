import { Status } from "./enums";

export interface Transaction {
  transactionId: number;
  invoiceId: number;
  type: string;
  transactionDate: string;
  description: string;
  amount: number;
  creationDate: string;
  name: string;
}

export interface Invoice {
  clientId: number;
  creationDate: string;
  referenceNumber: number;
  amount: number;
  status: Status;
  name: string;
}
