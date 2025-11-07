import { configureStore } from "@reduxjs/toolkit";
import expensesReducer from "../features/expenses/expensesSlice";

export const store = configureStore({
  reducer: {
    expenses: expensesReducer,
  },
});

// Types para usar en todo el proyecto
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


store.subscribe(() => {
  localStorage.setItem("expenses", JSON.stringify(store.getState().expenses));
});