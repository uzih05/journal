"use client";

import { useTheme } from "./ThemeProvider";

const modes = [
  {
    key: "light" as const,
    label: "Light",
    icon: (
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <circle cx="12" cy="12" r="5" />
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>
    ),
  },
  {
    key: "system" as const,
    label: "System",
    icon: (
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    key: "dark" as const,
    label: "Dark",
    icon: (
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    ),
  },
];

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center rounded-full border border-border bg-surface/80 p-0.5 backdrop-blur-md">
      {modes.map((mode) => {
        const isActive = theme === mode.key;
        return (
          <button
            key={mode.key}
            onClick={() => setTheme(mode.key)}
            className={`cursor-pointer rounded-full p-1.5 transition-all duration-200 ${
              isActive
                ? "bg-accent text-white"
                : "text-text-3 hover:text-text-2"
            }`}
            aria-label={mode.label}
            title={mode.label}
          >
            {mode.icon}
          </button>
        );
      })}
    </div>
  );
}
