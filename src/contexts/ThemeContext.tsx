"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { subscribeToColorSchemeChange } from "@/utils/theme";

export type Theme = "light" | "dark" | "system";
export type NoSystemTheme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  noSystemTheme: NoSystemTheme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>("system");
  const [noSystemTheme, setNoSystemTheme] = useState<NoSystemTheme>("light");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Initialize theme from localStorage or default to 'system'
    const savedTheme = (localStorage.getItem("theme") as Theme) || "system";
    setTheme(savedTheme);

    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    const htmlTag = document.documentElement;

    if (theme === "dark") {
      htmlTag.setAttribute("data-theme", "dark");
      htmlTag.setAttribute("style", "color-scheme: dark;");
      htmlTag.classList.toggle("dark", true);
      htmlTag.classList.toggle("light", false);
      setNoSystemTheme("dark");
      window.localStorage.setItem("theme", "dark");
    } else if (theme === "light") {
      htmlTag.setAttribute("data-theme", "light");
      htmlTag.setAttribute("style", "color-scheme: light;");
      htmlTag.classList.toggle("dark", false);
      htmlTag.classList.toggle("light", true);
      setNoSystemTheme("light");
      window.localStorage.setItem("theme", "light");
    } else {
      // System theme: Apply based on system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
      if (prefersDark.matches) {
        htmlTag.setAttribute("data-theme", "dark");
        htmlTag.setAttribute("style", "color-scheme: dark;");
        htmlTag.classList.toggle("dark", true);
        htmlTag.classList.toggle("light", false);
        setNoSystemTheme("dark");
      } else {
        htmlTag.setAttribute("data-theme", "light");
        htmlTag.setAttribute("style", "color-scheme: light;");
        htmlTag.classList.toggle("dark", false);
        htmlTag.classList.toggle("light", true);
        setNoSystemTheme("light");
      }
      window.localStorage.setItem("theme", "system");
    }
  }, [theme, isMounted]);

  useEffect(() => {
    const htmlTag = document.documentElement;

    if (theme === "system") {
      const unsubscribe = subscribeToColorSchemeChange((colorScheme) => {
        htmlTag.classList.toggle("dark", colorScheme === "dark");
        htmlTag.classList.toggle("light", colorScheme === "light");
        htmlTag.setAttribute("data-theme", `${colorScheme}`);
        htmlTag.setAttribute("style", `color-scheme: ${colorScheme};`);
      });

      return () => {
        unsubscribe();
      };
    }
  });

  return (
    <ThemeContext.Provider value={{ theme, setTheme, noSystemTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
