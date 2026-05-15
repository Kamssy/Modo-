import { createContext, useContext, useState, useEffect } from "react";

const BudgetContext = createContext();

export const BudgetProvider = ({ children }) => {
  const [budgets, setBudgets] = useState(() => {
    const saved = localStorage.getItem("modo_budgets");
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.map((b, i) => ({ ...b, id: b.id || `budget-${i}` }));
    }
    return []; // start empty
  });

  useEffect(() => {
    localStorage.setItem("modo_budgets", JSON.stringify(budgets));
  }, [budgets]);

  const addBudget = (newBudget) => {
    setBudgets((prev) => [...prev, newBudget]);
  };

  const editBudget = (updatedBudget) => {
    setBudgets((prev) => prev.map((b) => (b.id === updatedBudget.id ? updatedBudget : b)));
  };

  const deleteBudget = (id) => {
    setBudgets((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <BudgetContext.Provider value={{ budgets, addBudget, editBudget, deleteBudget }}>
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudgets = () => useContext(BudgetContext);