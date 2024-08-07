import fs from "fs";
import { Status } from "../../client/src/shared/enums";
import { Invoice } from "../../client/src/shared/interfaces";

// Helper function to read data from the JSON file
export const readData = (filePath: string): any[] => {
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
};

// Helper function to write data to the JSON file
export const writeData = (filePath: string, data: any[]) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// Calculate status based on transactions
export const evaluateStatus = (
  invoice: Invoice,
  transactions: any[]
): Status => {
  const matchingTransaction = transactions.find(
    (transaction) =>
      transaction.invoiceId == invoice.referenceNumber &&
      Math.abs(transaction.amount) == invoice.amount &&
      new Date(transaction.transactionDate) > new Date(invoice.creationDate)
  );

  return matchingTransaction ? Status.PAID : Status.NOT_PAID;
};
