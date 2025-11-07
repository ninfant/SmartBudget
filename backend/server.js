import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/users.js";
import transactionRoutes from "./routes/transactions.js";

mongoose.connect("mongodb://localhost:27017/SmartBudget");

const app = express();

app.use(express.json());

// Rutas
app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
