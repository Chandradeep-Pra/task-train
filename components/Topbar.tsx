"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, ClipboardPenLine, LayoutDashboard, ListChecks, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/", label: "Overview" },
  { href: "/generate-prd", label: "Generate PRD" },
  { href: "/create-tkt", label: "Sprints" },
  { href: "/dashboard", label: "Dashboard" },
];

export default function Topbar() {
  const pathname = usePathname();
  const [darkMode, setDarkMode] = useState(false);
  const isLandingPage = pathname === "/";

  useEffect(() => {
    const savedTheme = localStorage.getItem("tasktrack-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldUseDark = savedTheme ? savedTheme === "dark" : prefersDark;

    setDarkMode(shouldUseDark);
    document.documentElement.classList.toggle("dark", shouldUseDark);
  }, []);

  const toggleTheme = () => {
    const nextValue = !darkMode;
    setDarkMode(nextValue);
    localStorage.setItem("tasktrack-theme", nextValue ? "dark" : "light");
    document.documentElement.classList.toggle("dark", nextValue);
  };

  if (isLandingPage) {
    return (
      <header className="fixed left-0 right-0 top-4 z-50 flex justify-center px-4">
        <nav className="rounded-full border border-[var(--tt-border)] bg-[var(--tt-surface)] p-1 shadow-[var(--tt-shadow)] backdrop-blur-xl">
          <div className="flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition hover:text-[var(--tt-ink)] ${
                  item.href === "/" ? "tt-nav-item-active" : "tt-nav-item"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </header>
    );
  }

  return (
    <header className="tt-header sticky top-0 z-50 w-full border-b backdrop-blur-xl">
      <div className="flex h-16 w-full items-center justify-between gap-4 px-4 lg:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <span className="tt-brand-mark grid h-9 w-9 place-items-center rounded-lg text-sm font-bold text-white shadow-md">
            TT
          </span>
          <span className="hidden sm:block">
            <span className="block text-base font-semibold leading-none text-[var(--tt-ink)]">TaskTrack</span>
            <span className="mt-1 block text-xs font-medium text-[var(--tt-soft)]">AI delivery loop</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-[var(--tt-border)] bg-white/45 p-1 dark:bg-white/5 md:flex">
          {navItems.map((item) => {
            const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3 py-2 text-sm font-medium transition hover:text-[var(--tt-ink)] ${
                  isActive ? "tt-nav-item-active" : "tt-nav-item"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="grid h-9 w-9 place-items-center rounded-lg border border-[var(--tt-border)] bg-white/55 text-[var(--tt-soft)] transition hover:text-[var(--tt-ink)] dark:bg-white/5"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <Button asChild className="hidden rounded-lg bg-[var(--tt-brand)] text-white hover:bg-[var(--tt-brand-strong)] sm:inline-flex">
            <Link href="/generate-prd">
              <ClipboardPenLine className="h-4 w-4" />
              Start
            </Link>
          </Button>

          <Button asChild variant="outline" className="rounded-lg border-[var(--tt-border)] bg-white/55 dark:bg-white/5">
            <Link href="/create-tkt">
              <ListChecks className="h-4 w-4 sm:hidden" />
              <LayoutDashboard className="hidden h-4 w-4 sm:block" />
              <span className="hidden sm:inline">Workspace</span>
              <ArrowRight className="hidden h-4 w-4 sm:block" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
