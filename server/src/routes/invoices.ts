import express from "express";
import path from "path";
import { Status } from "../../../client/src/shared/enums";
import { Invoice } from "../../../client/src/shared/interfaces";
import { readData, writeData } from "../../shared/utils";

const router = express.Router();

const invoicesPath = path.join(__dirname, "../../data/invoices.json");
const transactionsPath = path.join(__dirname, "../../data/transactions.json");

// Calculate status based on transactions
const calculateStatus = (
  invoice: Omit<Invoice, "status">,
  transactions: any[]
): Status => {
  const matchingTransaction = transactions.find(
    (transaction) =>
      transaction.referenceNumber === invoice.referenceNumber &&
      transaction.amount === invoice.amount &&
      new Date(transaction.transactionDate) > new Date(invoice.creationDate)
  );

  return matchingTransaction ? Status.PAID : Status.NOT_PAID;
};

// Fetch all invoices
router.get("/", (req, res) => {
  const invoices = readData(invoicesPath);

  const invoicesWithStatus = invoices.map((invoice) => ({
    ...invoice,
  }));

  res.json(invoicesWithStatus);
});

// Create a new invoice
router.post("/", (req, res) => {
  const invoices = readData(invoicesPath);
  const transactions = readData(transactionsPath);
  const newInvoice: Invoice = { ...req.body, status: Status.NOT_PAID };
  newInvoice.status = calculateStatus(newInvoice, transactions);

  invoices.push(newInvoice);
  writeData(invoicesPath, invoices);
  res.status(201).json(newInvoice);
});

// Update an existing invoice
router.put("/:referenceNumber", (req, res) => {
  const invoices = readData(invoicesPath);
  const transactions = readData(transactionsPath);
  const index = invoices.findIndex(
    (invoice) =>
      invoice.referenceNumber === parseInt(req.params.referenceNumber, 10)
  );

  if (index !== -1) {
    invoices[index] = { ...invoices[index], ...req.body };
    invoices[index].status = calculateStatus(invoices[index], transactions);
    writeData(invoicesPath, invoices);
    res.json(invoices[index]);
  } else {
    res.status(404).json({ message: "Invoice not found" });
  }
});

// Delete an invoice
router.delete("/:referenceNumber", (req, res) => {
  const invoices = readData(invoicesPath);
  const updatedInvoices = invoices.filter(
    (invoice) =>
      invoice.referenceNumber !== parseInt(req.params.referenceNumber, 10)
  );
  writeData(invoicesPath, updatedInvoices);
  res.status(204).end();
});

export default router;
