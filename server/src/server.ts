import express from "express";
import invoicesRouter from "./routes/invoices";
import transactionsRouter from "./routes/transactions";

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/invoices", invoicesRouter);
app.use("/transactions", transactionsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
