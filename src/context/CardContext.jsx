import { createContext, useContext, useState, useEffect } from "react";

const CardContext = createContext();

const initialCards = [
  {
    id: 1,
    balance: 482300,
    income: 150000,
    expense: 89700,
    cardNumber: "4821",
    status: "Active",
    cardholder: "Kamsiriochi",
    billing: "Lagos, Nigeria",
    expires: "12/28"
  }
];

export const CardProvider = ({ children }) => {
  const [cards, setCards] = useState(() => {
    const saved = localStorage.getItem("modo_cards");
    return saved ? JSON.parse(saved) : initialCards;
  });

  useEffect(() => {
    localStorage.setItem("modo_cards", JSON.stringify(cards));
  }, [cards]);

  const addCard = (newCard) => {
    setCards((prev) => [...prev, newCard]);
  };

  const removeCard = (id) => {
    setCards((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <CardContext.Provider value={{ cards, addCard, removeCard }}>
      {children}
    </CardContext.Provider>
  );
};

export const useCards = () => useContext(CardContext);
