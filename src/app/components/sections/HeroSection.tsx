"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { profile } from "@/data/profile";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = containerRef.current?.querySelectorAll("[data-reveal]");
    if (!els) return;
    els.forEach((el, i) => {
      setTimeout(() => {
        (el as HTMLElement).style.opacity = "1";
        (el as HTMLElement).style.transform = "translateY(0)";
      }, 200 + i * 150);
    });
  }, []);

  return (
    <section className="relative flex min-h-[100dvh] items-center overflow-hidden px-6 lg:px-0">
      <div ref={containerRef} className="mx-auto w-full max-w-6xl">
        {/* Eyebrow */}
        <div
          data-reveal
          className="mb-8 flex items-center gap-4 opacity-0 translate-y-6 transition-all duration-700"
        >
          <div className="h-px w-12 bg-accent" />
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-accent lg:text-sm">
            @{profile.githubUsername}
          </span>
        </div>

        {/* Name — editorial oversized */}
        <h1
          data-reveal
          className="text-6xl font-bold leading-[0.9] tracking-tighter sm:text-8xl lg:text-[10rem] opacity-0 translate-y-6 transition-all duration-700"
        >
          {profile.nameEn.split(" ").map((word, i) => (
            <span key={i} className="block">
              {word}
            </span>
          ))}
        </h1>

        {/* Description — offset to the right */}
        <div
          data-reveal
          className="mt-8 ml-auto max-w-md lg:max-w-lg opacity-0 translate-y-6 transition-all duration-700"
        >
          <p className="whitespace-pre-line text-base leading-relaxed text-text-2 sm:text-lg">
            {profile.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="#projects"
              className="group inline-flex items-center gap-3 text-sm font-medium text-text transition-colors hover:text-accent"
            >
              <span className="h-px w-8 bg-text transition-all group-hover:w-12 group-hover:bg-accent" />
              View Projects
            </Link>
            <Link
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 text-sm font-medium text-text-2 transition-colors hover:text-accent"
            >
              <span className="h-px w-8 bg-text-3 transition-all group-hover:w-12 group-hover:bg-accent" />
              GitHub
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          data-reveal
          className="mt-16 flex items-center justify-between border-t border-border pt-6 opacity-0 translate-y-6 transition-all duration-700"
        >
          <span className="text-xs uppercase tracking-widest text-text-3">
            {profile.role}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-text-3">
              Scroll
            </span>
            <svg className="h-5 w-5 text-text-3 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
