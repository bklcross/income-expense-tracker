import "./App.css";
import { Box } from "@mui/material";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import NavBar from "./components/NavBar";

export const App = () => {
  return (
    <Router>
      <NavBar/>
      <Box className={"App"}>
        <Routes>
          {/* <Route path="/" element={<Home />} />
          <Route path="/summary" element={<Summary />} /> */}
        </Routes>
      </Box>
    </Router>
  );
};