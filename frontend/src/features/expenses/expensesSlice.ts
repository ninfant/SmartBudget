import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Expense } from "../../types/Expense.tsx";

// PayloadAction: tipado para decir qué tipo de datos lleva la acción (payload).

// carga inicial desde localStorage
const saved: string | null = localStorage.getItem("expenses");
const initialState: Expense[] = saved ? JSON.parse(saved) : [];
//el tipo de la variable initialState es Expense[] ➜ un array de gastos

const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addExpense(state, action: PayloadAction<Expense>) {
      state.unshift(action.payload); // añade al inicio
    },
    removeExpense(state, action: PayloadAction<string>) {
      return state.filter((e) => e.id !== action.payload);
    },
    updateExpense(state, action: PayloadAction<Expense>) {
      const idx = state.findIndex((e) => e.id === action.payload.id);
      if (idx !== -1) state[idx] = action.payload;
    },
    setExpenses(state, action: PayloadAction<Expense[]>) {
      return action.payload;
    },
    clearExpenses() {
      return [];
    },
  },
});

export const {
  addExpense,
  removeExpense,
  updateExpense,
  setExpenses,
  clearExpenses,
} = expensesSlice.actions;

export default expensesSlice.reducer;

// expensesSlice.actions → todas las acciones que puedes “mandar” (dispatch).
// expensesSlice.reducer → el mago que cambia la caja según la acción.
