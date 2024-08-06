import React, { useEffect, useState } from "react";
import axios from "axios";
import { Transaction } from "../shared/interfaces";
import { evaluateColor } from "../shared/utils";
import { Box, Typography } from "@mui/material";

export const Summary: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/transactions");
        const data: Transaction[] = response.data;
        setTransactions(data);

        // Calculate total amount
        const totalAmount = data.reduce(
          (acc, transaction) => acc + transaction.amount,
          0
        );
        setTotal(totalAmount);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box className="App">
      <Typography variant={"h1"}>Financial Summary</Typography>
      <Box className="summary-widget">
        <Typography variant={"h2"} sx={{ color: evaluateColor(total) }}>
          {`Total: $${total.toFixed(2)}`}
        </Typography>
      </Box>
    </Box>
  );
};
