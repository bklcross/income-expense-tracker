import "./App.css";
import { Box, Tab, Tabs } from "@mui/material";
import { Route, Routes, useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import { Summary } from "./components/Summary";
import { useEffect, useState } from "react";
import { Pages } from "./shared/enums";
import { Transactions } from "./components/Transactions";
import { Invoices } from "./components/Invocies";
import { Invoice, Transaction } from "./shared/interfaces";
import axios from "axios";

export const App = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [tab, setTab] = useState<number>(0);
  const navigate = useNavigate();

  const loadInvoices = async () => {
    try {
      const response = await axios.get<Invoice[]>("/invoices");
      setInvoices(response.data);
    } catch (error) {
      console.error("Failed to fetch invoices:", error);
    }
  };

  const loadTransactions = async () => {
    try {
      const response = await axios.get<Transaction[]>("/transactions");
      setTransactions(response.data);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    }
  };

  useEffect(() => {
    loadInvoices();
    loadTransactions();
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);

    switch (newValue) {
      case Pages.Summary:
        navigate("/");
        break;
      case Pages.Transactions:
        navigate("/transactions");
        break;
      case Pages.Invoices:
        navigate("/invoices");
        break;
      default:
        navigate("/");
    }
  };

  return (
    <Box>
      <NavBar />
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tab}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Summary" />
          <Tab label="Transactions" />
          <Tab label="Invoices" />
        </Tabs>
      </Box>
      <Box className={"App"}>
        <Routes>
          <Route
            path="/"
            element={
              <Summary transactions={transactions} invoices={invoices} />
            }
          />
          <Route
            path="/transactions"
            element={<Transactions transactions={transactions} />}
          />
          <Route
            path="/invoices"
            element={
              <Invoices
                loadInvoices={loadInvoices}
                loadTransactions={loadTransactions}
                transactions={transactions}
                invoices={invoices}
              />
            }
          />
        </Routes>
      </Box>
    </Box>
  );
};
