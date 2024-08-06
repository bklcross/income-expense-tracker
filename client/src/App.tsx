import "./App.css";
import { Box, Tab, Tabs } from "@mui/material";
import { Route, Routes, useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import { Summary } from "./components/Summary";
import { useState } from "react";
import { Pages } from "./shared/enums";
import { Transactions } from "./components/Transactions";
import { Invoices } from "./components/Invocies";

export const App = () => {
  const [tab, setTab] = useState<number>(0);
  const navigate = useNavigate();

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
          <Route path="/" element={<Summary />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/invoices" element={<Invoices />} />
        </Routes>
      </Box>
    </Box>
  );
};
