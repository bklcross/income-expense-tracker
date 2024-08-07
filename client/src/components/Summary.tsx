import React, { useEffect, useState } from "react";
import axios from "axios";
import { Invoice, Transaction } from "../shared/interfaces";
import { evaluateColor, filterLast30DaysInvoices } from "../shared/utils";
import { Box, Typography } from "@mui/material";

interface SummaryProps {
  transactions: Transaction[];
  invoices: Invoice[];
}

export const Summary = ({
  transactions,
  invoices,
}: SummaryProps): JSX.Element => {
  const [total, setTotal] = useState<number>(0);
  const [invoiceCount, setInvoiceCount] = useState<number>(0);

  useEffect(() => {
    const filteredInvoices: Invoice[] = filterLast30DaysInvoices(invoices);
    setInvoiceCount(filteredInvoices.length);

    const totalAmount = transactions.reduce(
      (acc, transaction) => acc + transaction.amount,
      0
    );
    setTotal(totalAmount);
  }, [transactions, invoices]);

  return (
    <Box className="App">
      <Typography variant={"h3"}>Financial Summary</Typography>
      <Box>
        <Typography variant={"h4"} sx={{ color: evaluateColor(total) }}>
          {`Total: ${total > 0 ? "" : "-"}$${Math.abs(total).toFixed(2)}`}
        </Typography>
      </Box>
      <Box>
        <Typography variant={"h4"}>
          {`Invoice Count (last 30 days): ${invoiceCount}`}
        </Typography>
      </Box>
    </Box>
  );
};
