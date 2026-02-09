"use client";

import { useEffect, useState } from "react";
import type { TOCHeading } from "@/lib/blog/types";

interface TOCProps {
  headings: TOCHeading[];
}

export default function TableOfContents({ headings }: TOCProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -80% 0px" },
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  return (
    <nav className="sticky top-24 w-56" aria-label="목차">
      <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-text-3">
        Contents
      </p>
      <ul className="space-y-1 border-l border-border">
        {headings.map(({ id, text, level }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={`block border-l-2 py-1 text-xs leading-relaxed transition-colors ${
                level === 3 ? "pl-6" : "pl-3"
              } ${
                activeId === id
                  ? "border-accent font-medium text-text"
                  : "border-transparent text-text-3 hover:text-text-2"
              }`}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
