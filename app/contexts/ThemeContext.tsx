"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

type themeContextValueType = "light" | "dark" | null;

type ThemeContextProviderTypes = {
  value: themeContextValueType;
  setValue: Dispatch<SetStateAction<themeContextValueType>>;
} | null;

export const themeContext = createContext<ThemeContextProviderTypes>(null);

const ThemeContextProvider = ({ children }: React.PropsWithChildren) => {
  const [theme, setTheme] = useState<themeContextValueType>(() => {
    if (typeof window !== "undefined") {
      return (
        JSON.parse(localStorage.getItem("theme")!) &&
        JSON.parse(localStorage.getItem("theme")!)
      );
    }
    return "light";
  });

  useEffect(() => {
    const storage = localStorage.getItem("theme");
    if (!storage) {
      localStorage.setItem("theme", JSON.stringify("light"));
      setTheme('light')
    } else {
      const theme = JSON.parse(localStorage.getItem("theme")!);
      setTheme(theme);
    }
  }, []);

  return (
    <themeContext.Provider value={{ value: theme, setValue: setTheme }}>
      {children}
    </themeContext.Provider>
  );
};

export default ThemeContextProvider;
