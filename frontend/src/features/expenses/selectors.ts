import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store/store.tsx";

// ============================================
// SELECTORES BASE (simples, acceden directo al estado)
// ============================================
export const selectExpenses = (state: RootState) => state.expenses;

// ============================================
// SELECTORES MEMOIZADOS (se recalculan solo si cambian dependencias)
// ============================================

// Total gastado
export const selectTotalAmount = createSelector([selectExpenses], (expenses) =>
  expenses.reduce((sum, e) => sum + e.amount, 0)
);

// Cantidad de gastos
export const selectExpensesCount = createSelector(
  [selectExpenses],
  (expenses) => expenses.length
);

// Gastos ordenados por fecha (más recientes primero)
export const selectExpensesSortedByDate = createSelector(
  [selectExpenses],
  (expenses) =>
    [...expenses].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
);

// Gasto promedio
export const selectAverageAmount = createSelector(
  [selectExpenses, selectExpensesCount],
  (expenses, count) =>
    count > 0 ? expenses.reduce((sum, e) => sum + e.amount, 0) / count : 0
);

// Gastos agrupados por categoría
export const selectExpensesByCategoryMap = createSelector(
  [selectExpenses],
  (expenses) => {
    return expenses.reduce((acc, expense) => {
      if (!acc[expense.category]) {
        acc[expense.category] = [];
      }
      acc[expense.category].push(expense);
      return acc;
    }, {} as Record<string, typeof expenses>);
  }
);

// Lista de categorías únicas
export const selectCategories = createSelector([selectExpenses], (expenses) => [
  ...new Set(expenses.map((e) => e.category)),
]);

// Total por categoría
export const selectTotalByCategory = createSelector(
  [selectExpensesByCategoryMap],
  (byCategory) => {
    return Object.entries(byCategory).reduce((acc, [category, expenses]) => {
      acc[category] = expenses.reduce((sum, e) => sum + e.amount, 0);
      return acc;
    }, {} as Record<string, number>);
  }
);

// ============================================
// SELECTORES PARAMETRIZADOS (aceptan parámetros)
// ============================================

// Gastos por categoría específica
export const selectExpensesByCategory = createSelector(
  [selectExpenses, (state: RootState, category: string) => category],
  (expenses, category) => expenses.filter((e) => e.category === category)
);

// Total de una categoría específica
export const selectTotalByCategoryName = createSelector(
  [selectExpensesByCategory, (state: RootState, category: string) => category],
  (expenses) => expenses.reduce((sum, e) => sum + e.amount, 0)
);

// Buscar gasto por ID
export const selectExpenseById = createSelector(
  [selectExpenses, (state: RootState, id: string) => id],
  (expenses, id) => expenses.find((e) => e.id === id)
);

// Gastos en un rango de fechas
export const selectExpensesByDateRange = createSelector(
  [
    selectExpenses,
    (state: RootState, startDate: Date, endDate: Date) => ({
      startDate,
      endDate,
    }),
  ],
  (expenses, { startDate, endDate }) =>
    expenses.filter((e) => {
      const expenseDate = new Date(e.date);
      return expenseDate >= startDate && expenseDate <= endDate;
    })
);

// Gastos del mes actual
export const selectCurrentMonthExpenses = createSelector(
  [selectExpenses],
  (expenses) => {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    return expenses.filter((e) => {
      const expenseDate = new Date(e.date);
      return expenseDate >= firstDay && expenseDate <= lastDay;
    });
  }
);
