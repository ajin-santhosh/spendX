// components/ThemeProvider.js
import { useEffect } from "react";
import { useThemeStore } from "@/stores/themeStore";

export function ThemeProvider({ children }) {
  const { theme } = useThemeStore();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.add(systemDark ? "dark" : "light");
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  return <>{children}</>;
}