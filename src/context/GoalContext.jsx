import { createContext, useContext, useState, useEffect } from "react";

const GoalContext = createContext();

export const GoalProvider = ({ children }) => {
  const [goals, setGoals] = useState(() => {
    const saved = localStorage.getItem("modo_goals");
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.map((g, i) => ({ ...g, id: g.id || `goal-${i}` }));
    }
    return []; // start empty
  });

  useEffect(() => {
    localStorage.setItem("modo_goals", JSON.stringify(goals));
  }, [goals]);

  const addGoal = (newGoal) => {
    setGoals((prev) => [...prev, newGoal]);
  };

  const editGoal = (updatedGoal) => {
    setGoals((prev) => prev.map((g) => (g.id === updatedGoal.id ? updatedGoal : g)));
  };

  const deleteGoal = (id) => {
    setGoals((prev) => prev.filter((g) => g.id !== id));
  };

  return (
    <GoalContext.Provider value={{ goals, addGoal, editGoal, deleteGoal }}>
      {children}
    </GoalContext.Provider>
  );
};

export const useGoals = () => useContext(GoalContext);