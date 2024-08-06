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
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import axios from "axios";
import { Invoice, Transaction } from "../shared/interfaces";

export const Invoices: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [open, setOpen] = useState(false);
  const [newInvoice, setNewInvoice] = useState<Omit<Invoice, "status">>({
    clientId: 0,
    creationDate: "",
    referenceNumber: 0,
    amount: 0,
    name: "",
  });

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get<Invoice[]>("/invoices");
        setInvoices(response.data);
      } catch (error) {
        console.error("Failed to fetch invoices:", error);
      }
    };

    const fetchTransactions = async () => {
      try {
        const response = await axios.get<Transaction[]>("/transactions");
        setTransactions(response.data);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      }
    };

    fetchInvoices();
    fetchTransactions();
  }, []);

  const handleClickOpen = () => {
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
      const response = await axios.post<Invoice>("/invoices", {
        ...newInvoice,
      });

      setInvoices([...invoices, response.data]);
      handleClose();
    } catch (error) {
      console.error("Failed to save invoice:", error);
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
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleDelete(invoice.referenceNumber)}
          >
            Delete
          </Button>
        </TableCell>
      </TableRow>
    ));
  };

  const handleEdit = (invoice: Invoice) => {
    setNewInvoice({
      clientId: invoice.clientId,
      creationDate: invoice.creationDate,
      referenceNumber: invoice.referenceNumber,
      amount: invoice.amount,
      name: invoice.name,
    });
    setOpen(true);
  };

  const handleDelete = async (referenceNumber: number) => {
    try {
      await axios.delete(`/invoices/${referenceNumber}`);
      setInvoices(
        invoices.filter(
          (invoice) => invoice.referenceNumber !== referenceNumber
        )
      );
    } catch (error) {
      console.error("Failed to delete invoice:", error);
    }
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

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Invoice</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Client Name"
            type="text"
            fullWidth
            variant="standard"
            value={newInvoice.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="creationDate"
            label="Creation Date"
            type="date"
            fullWidth
            variant="standard"
            value={newInvoice.creationDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            name="referenceNumber"
            label="Reference Number"
            type="number"
            fullWidth
            variant="standard"
            value={newInvoice.referenceNumber}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="amount"
            label="Amount"
            type="number"
            fullWidth
            variant="standard"
            value={newInvoice.amount}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
