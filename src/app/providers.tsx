"use client";
 
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { createContext, useContext, useState, useEffect } from "react";
 
type Theme = "light" | "dark";
 
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}
 
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
 
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
 
function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
 
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }
  }, []);
 
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
 
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
 
  return (
<ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
</ThemeContext.Provider>
  );
}
 
export function Providers({ children }: { children: React.ReactNode }) {
  return (
<SessionProvider>
<ThemeProvider>
        {children}
<Toaster
          position="bottom-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "var(--card-bg)",
              color: "var(--foreground)",
              border: "1px solid var(--border)",
            },
          }}
        />
</ThemeProvider>
</SessionProvider>
  );
}