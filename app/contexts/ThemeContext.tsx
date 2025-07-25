"use client";

import { usePathname } from "next/navigation";
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
  const pathName = usePathname()
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

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem("theme")!);
      if(storage === 'dark'){
         setTheme('dark')
      }
  },[pathName])

  return (
    <themeContext.Provider value={{ value: theme, setValue: setTheme }}>
      {children}
    </themeContext.Provider>
  );
};

export default ThemeContextProvider;
