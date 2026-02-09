"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { label: "Projects", href: "/#projects", num: "01" },
  { label: "Stack", href: "/#stack", num: "02" },
  { label: "Blog", href: "/blog", num: "03" },
  { label: "Contact", href: "/#contact", num: "04" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu is open + ESC to close
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    if (menuOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      {/* Top bar */}
      <header
        className={`fixed top-0 left-0 right-0 z-[100] border-b transition-colors duration-300 ${
          scrolled && !menuOpen
            ? "border-border bg-bg/80 backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <nav aria-label="Main navigation" className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 lg:px-0">
          <Link
            href="/"
            className="text-sm font-bold tracking-tight text-text transition-colors hover:text-accent"
            onClick={closeMenu}
          >
            JH.
          </Link>

          <div className="flex items-center gap-5">
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="cursor-pointer text-xs font-medium uppercase tracking-[0.2em] text-text-2 transition-colors hover:text-accent"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? "Close" : "Menu"}
            </button>
          </div>
        </nav>
      </header>

      {/* Fullscreen overlay menu */}
      <div
        className={`fixed inset-0 z-[99] flex flex-col justify-center bg-bg transition-all duration-500 ${
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div className="mx-auto w-full max-w-6xl px-6 lg:px-0">
          <nav aria-label="Menu navigation" className="space-y-0">
            {navItems.map((item, i) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={closeMenu}
                className="group flex items-center gap-6 border-b border-border py-6 transition-colors sm:gap-10 sm:py-8"
                style={{
                  transitionProperty: "opacity, transform, color",
                  transitionDuration: "0.4s, 0.4s, 0.2s",
                  transitionTimingFunction: "ease",
                  transitionDelay: menuOpen ? `${i * 60}ms` : "0ms",
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? "translateY(0)" : "translateY(20px)",
                }}
              >
                <span className="font-mono text-sm text-text-3 transition-colors group-hover:text-accent">
                  {item.num}
                </span>
                <span className="text-3xl font-bold tracking-tight transition-colors group-hover:text-accent sm:text-5xl lg:text-6xl">
                  {item.label}
                </span>
                <span className="ml-auto h-px w-0 bg-accent transition-all duration-300 group-hover:w-16" />
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
