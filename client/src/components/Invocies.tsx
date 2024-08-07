import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
} from "@mui/material";
import axios from "axios";
import { Invoice, Transaction } from "../shared/interfaces";
import { formatDate } from "../shared/utils";
import { InvoiceDialog } from "./InvoiceDialog";

interface InvoicesProps {
  loadTransactions: () => Promise<void>;
  loadInvoices: () => Promise<void>;
  transactions: Transaction[];
  invoices: Invoice[];
}

export const Invoices = ({
  loadTransactions,
  loadInvoices,
  transactions,
  invoices,
}: InvoicesProps): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [newInvoice, setNewInvoice] = useState<Omit<Invoice, "status">>({
    invoiceId: 0,
    creationDate: "",
    referenceNumber: 0,
    amount: 0,
    name: "",
  });
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    loadInvoices();
    loadTransactions();
  }, []);

  const handleClickOpen = () => {
    setIsEdit(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewInvoice({ ...newInvoice, [name]: value });
  };

  const handleSave = async () => {
    try {
      if (isEdit) {
        // Update existing invoice
        await axios.put<Invoice>(`/invoices/${newInvoice.invoiceId}`, {
          ...newInvoice,
          creationDate: formatDate(new Date(newInvoice.creationDate)),
        });
      } else {
        // Add new invoice
        await axios.post<Invoice>("/invoices", {
          ...newInvoice,
          creationDate: formatDate(new Date(newInvoice.creationDate)),
        });
      }

      await loadInvoices();

      handleClose();
    } catch (error) {
      console.error("Failed to save invoice:", error);
    }
  };

  const handleEdit = (invoice: Invoice) => {
    setIsEdit(true);
    setNewInvoice({
      invoiceId: invoice.invoiceId,
      creationDate: invoice.creationDate,
      referenceNumber: invoice.referenceNumber,
      amount: invoice.amount,
      name: invoice.name,
    });
    setOpen(true);
  };

  const handleDelete = async (invoiceId: number) => {
    try {
      await axios.delete(`/invoices/${invoiceId}`);

      await loadInvoices();
    } catch (error) {
      console.error("Failed to delete invoice:", error);
    }
  };

  const renderInvoices = () => {
    return invoices.map((invoice) => (
      <TableRow key={invoice.referenceNumber}>
        <TableCell>{invoice.name}</TableCell>
        <TableCell>{invoice.creationDate}</TableCell>
        <TableCell>{invoice.referenceNumber}</TableCell>
        <TableCell align="right">{invoice.amount}</TableCell>
        <TableCell>{invoice.status}</TableCell>
        <TableCell>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleEdit(invoice)}
            sx={{ margin: "0 8px" }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleDelete(invoice.invoiceId)}
            sx={{ margin: "0 8px" }}
          >
            Delete
          </Button>
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Invoices
      </Typography>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add Invoice
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Client Name</TableCell>
              <TableCell>Creation Date</TableCell>
              <TableCell>Reference Number</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderInvoices()}</TableBody>
        </Table>
      </TableContainer>
      <InvoiceDialog
        open={open}
        handleClose={handleClose}
        handleSave={handleSave}
        handleChange={handleChange}
        newInvoice={newInvoice}
        isEdit={isEdit}
      />
    </Box>
  );
};
