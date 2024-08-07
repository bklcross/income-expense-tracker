import { ReactNode } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import { Transaction } from "../shared/interfaces";
import axios from "axios";

interface TransactionsProps {
  transactions: Transaction[];
}

export const Transactions = ({
  transactions,
}: TransactionsProps): JSX.Element => {
  const renderTransactions = (): ReactNode | null => {
    let result: ReactNode | null = null;

    if (transactions.length) {
      result = transactions.map((transaction) => (
        <TableRow key={transaction.transactionId}>
          <TableCell component="th" scope="row">
            {transaction.transactionId}
          </TableCell>
          <TableCell align="right">{transaction.invoiceId}</TableCell>
          <TableCell>{transaction.type}</TableCell>
          <TableCell>{transaction.transactionDate}</TableCell>
          <TableCell>{transaction.description}</TableCell>
          <TableCell align="right">{transaction.amount}</TableCell>
          <TableCell>{transaction.creationDate}</TableCell>
          <TableCell>{transaction.name}</TableCell>
        </TableRow>
      ));
    }

    return result;
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Transactions
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Transaction ID</TableCell>
              <TableCell align="right">Invoice ID</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Transaction Date</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell>Creation Date</TableCell>
              <TableCell>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderTransactions()}</TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
