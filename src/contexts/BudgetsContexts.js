import React, { useContext, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import useLocalStorage from "../hooks/useLocalStorage";

const BudgetsContexts = React.createContext();

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized";

//allows us to use context
export const useBudgets = () => {
  return useContext(BudgetsContexts);
};

//Budget Provider that we wrap our entire application in
export const BudgetsProvider = ({ children }) => {
  const [budgets, setBudgets] = useLocalStorage("budgets", []);
  const [expenses, setExpenses] = useLocalStorage("expenses", []);

  const getBudgetExpenses = (budgetId) => {
    return expenses.filter((expense) => expense.budgetId === budgetId);
  };
  const addBudget = ({ name, max }) => {
    setBudgets((prevBudgets) => {
      if (prevBudgets.find((budget) => budget.name === name))
        return prevBudgets;
      return [...prevBudgets, { id: uuidV4(), name, max }];
    });
  };
  const addExpense = ({ description, amount, budgetId }) => {
    setExpenses((prevExpenses) => {
      return [...prevExpenses, { id: uuidV4(), description, amount, budgetId }];
    });
  };
  const deleteExpense = ({ id }) => {
    setExpenses((prevExpenses) => {
      return prevExpenses.filter((expense) => expense.id != id);
    });
  };
  const deleteBudget = ({ id }) => {
    setExpenses((prevExpenses) => {
      return prevExpenses.map((expense) => {
        if (expense.budgetId != id) return expense;
        return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID };
      });
    });
    setBudgets((prevBudgets) => {
      return prevBudgets.filter((budget) => budget.id != id);
    });
  };

  return (
    <BudgetsContexts.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteExpense,
        deleteBudget,
      }}
    >
      {children}
    </BudgetsContexts.Provider>
  );
};
