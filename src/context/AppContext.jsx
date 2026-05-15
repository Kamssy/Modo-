import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

const defaultProfile = {
  name: "Kamsiriochi",
  email: "kamsi@example.com",
  avatar: "K", // Fallback letter
  plan: "Pro Plan",
};

export const AppProvider = ({ children }) => {
  // --- Dark Mode ---
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("modo_dark_mode");
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem("modo_dark_mode", JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // --- Currency ---
  const [currency, setCurrency] = useState(() => {
    const saved = localStorage.getItem("modo_currency");
    // Validate that it's exactly a 3-letter string (NGN, USD, GBP) to avoid crashing from old JSON objects
    if (saved && ["NGN", "USD", "GBP"].includes(saved)) {
      return saved;
    }
    return "NGN";
  });

  useEffect(() => {
    localStorage.setItem("modo_currency", currency);
  }, [currency]);

  // --- Profile ---
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem("modo_profile");
    return saved ? JSON.parse(saved) : defaultProfile;
  });

  useEffect(() => {
    localStorage.setItem("modo_profile", JSON.stringify(profile));
  }, [profile]);

  const updateProfile = (updates) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  };

  return (
    <AppContext.Provider
      value={{
        darkMode,
        setDarkMode,
        currency,
        setCurrency,
        profile,
        updateProfile,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
