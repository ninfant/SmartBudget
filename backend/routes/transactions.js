import express from "express";
import Transaction from "../models/Transactions.js";

const router = express.Router();

// GET /api/transactions - Obtener todas las transacciones
router.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.find().populate(
      "userId",
      "name email"
    );
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/transactions/:id - Obtener una transacción por ID
router.get("/:id", async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id).populate(
      "userId",
      "name email"
    );
    if (!transaction) {
      return res.status(404).json({ message: "Transacción no encontrada" });
    }
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/transactions/user/:userId - Obtener transacciones de un usuario específico
router.get("/user/:userId", async (req, res) => {
  try {
    const transactions = await Transaction.find({
      userId: req.params.userId,
    }).populate("userId", "name email");
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/transactions - Crear una nueva transacción
router.post("/", async (req, res) => {
  try {
    const transaction = new Transaction(req.body);
    const savedTransaction = await transaction.save();
    await savedTransaction.populate("userId", "name email");
    res.status(201).json(savedTransaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT /api/transactions/:id - Actualizar una transacción
router.put("/:id", async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    ).populate("userId", "name email");
    if (!transaction) {
      return res.status(404).json({ message: "Transacción no encontrada" });
    }
    res.json(transaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /api/transactions/:id - Eliminar una transacción
router.delete("/:id", async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: "Transacción no encontrada" });
    }
    res.json({ message: "Transacción eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
