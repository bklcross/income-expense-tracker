import express from "express";
import path from "path";
import { Status } from "../../../client/src/shared/enums";
import { Invoice, Transaction } from "../../../client/src/shared/interfaces";
import { evaluateStatus, readData, writeData } from "../../shared/utils";

const router = express.Router();

const invoicesPath = path.join(__dirname, "../../data/invoices.json");
const transactionsPath = path.join(__dirname, "../../data/transactions.json");

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
  const invoices: Invoice[] = readData(invoicesPath);
  const transactions: Transaction[] = readData(transactionsPath);
  const newInvoice: Invoice = { ...req.body, status: Status.NOT_PAID };
  newInvoice.status = evaluateStatus(newInvoice, transactions);

  invoices.push(newInvoice);
  writeData(invoicesPath, invoices);
  res.status(201).json(newInvoice);
});

// Update an existing invoice
router.put("/:id", (req, res) => {
  const invoices: Invoice[] = readData(invoicesPath);
  const transactions: Transaction[] = readData(transactionsPath);
  const index = invoices.findIndex(
    (invoice: Invoice) => invoice.invoiceId === parseInt(req.params.id)
  );

  if (index !== -1) {
    invoices[index] = { ...req.body };
    invoices[index].status = evaluateStatus(invoices[index], transactions);
    writeData(invoicesPath, invoices);
    res.json(invoices[index]);
  } else {
    res.status(404).json({ message: "Invoice not found" });
  }
});

// Delete an invoice
router.delete("/:id", (req, res) => {
  const invoices: Invoice[] = readData(invoicesPath);
  const updatedInvoices: Invoice[] = invoices.filter(
    (invoice: Invoice) => invoice.invoiceId !== parseInt(req.params.id)
  );

  console.log("*****", updatedInvoices);
  writeData(invoicesPath, updatedInvoices);
  res.status(204).end();
});

export default router;
