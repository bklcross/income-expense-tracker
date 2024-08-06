import express from "express";
import path from "path";
import { readData } from "../../shared/utils";

const router = express.Router();

const transactionsPath = path.join(__dirname, "../../data/transactions.json");

// Fetch all transactions
router.get("/", (req, res) => {
  try {
    const transactions = readData(transactionsPath);
    res.header("Content-Type", "application/json");
    res.send(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error reading transactions.json");
  }
});

export default router;
