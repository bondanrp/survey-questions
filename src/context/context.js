import { createContext, useContext, useEffect, useState } from "react";
import generateID from "../helper/id-generator";

var AppContext = createContext();

function setLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {}
}

function getLocalStorage(key, initialValue) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : initialValue;
  } catch (e) {
    return initialValue;
  }
}

function AppProvider({ children }) {
  const [tab, setTab] = useState(() => getLocalStorage("tab", 0));
  const [questions, setQuestions] = useState(() =>
    getLocalStorage("questions", [
      {
        question: "",
        options: ["Option 1", "Option 2"],
        required: false,
        type: "multiplechoice",
        id: generateID(),
      },
    ])
  );

  useEffect(() => {
    setLocalStorage("questions", questions);
    setLocalStorage("tab", tab);
  }, [questions, tab]);

  return (
    <AppContext.Provider
      value={{
        questions,
        setQuestions,
        tab,
        setTab,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}

export default AppProvider;
