"use client";

import { createContext, useContext, useEffect, useCallback, useSyncExternalStore } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
  resolved: "light" | "dark";
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "system",
  setTheme: () => {},
  resolved: "light",
});

export function useTheme() {
  return useContext(ThemeContext);
}

function getSystemTheme(): "light" | "dark" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(resolved: "light" | "dark") {
  const root = document.documentElement;
  if (resolved === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}

// External store — avoids setState-in-effect lint issues and hydration mismatch.
// Server snapshot and initial client snapshot are identical ({ system, light }),
// then the effect reads localStorage and calls update() to trigger a re-render.
interface ThemeState {
  theme: Theme;
  resolved: "light" | "dark";
}

const serverSnapshot: ThemeState = { theme: "system", resolved: "light" };
let snapshot: ThemeState = serverSnapshot;
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
}

function getSnapshot() {
  return snapshot;
}

function getServerSnapshotFn() {
  return serverSnapshot;
}

function updateStore(next: ThemeState) {
  snapshot = next;
  listeners.forEach((l) => l());
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshotFn);

  // Read from localStorage once after mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("theme") as Theme | null;
      const theme = stored && ["light", "dark", "system"].includes(stored) ? stored : "system";
      const resolved = theme === "system" ? getSystemTheme() : theme;
      applyTheme(resolved);
      updateStore({ theme, resolved });
    } catch {
      const resolved = getSystemTheme();
      applyTheme(resolved);
      updateStore({ theme: "system", resolved });
    }
  }, []);

  // Listen for system theme changes
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      if (snapshot.theme === "system") {
        const res = getSystemTheme();
        applyTheme(res);
        updateStore({ ...snapshot, resolved: res });
      }
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const setTheme = useCallback((t: Theme) => {
    localStorage.setItem("theme", t);
    const res = t === "system" ? getSystemTheme() : t;
    applyTheme(res);
    updateStore({ theme: t, resolved: res });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: state.theme, setTheme, resolved: state.resolved }}>
      {children}
    </ThemeContext.Provider>
  );
}
