"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

const THEME_CYCLE = ["light", "dark"] as const;

export function ThemeSwitcher() {
  const { setTheme, theme } = useTheme();

  const cycleTheme = () => {
    const currentIndex = THEME_CYCLE.indexOf(
      theme as (typeof THEME_CYCLE)[number],
    );
    const nextTheme = THEME_CYCLE[(currentIndex + 1) % THEME_CYCLE.length];
    setTheme(nextTheme);
  };

  return (
    <Button
      size="icon"
      onClick={cycleTheme}
      aria-label={`Current theme: ${theme}. Click to cycle themes`}
    >
      {/* SYSTEM */}
      <Monitor className="hidden [html[data-theme-mode=system]_&]:block" />

      {/* DARK (resolved) */}
      <Sun className="hidden dark:block [html[data-theme-mode=system]_&]:hidden" />

      {/* LIGHT (resolved) */}
      <Moon className="block dark:hidden [html[data-theme-mode=system]_&]:hidden" />
    </Button>
  );
}
