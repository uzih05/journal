"use client";

import { useEffect, useRef, useState } from "react";
import {
  useScroll,
  useTransform,
  useMotionValueEvent,
  motion,
  type MotionValue,
} from "framer-motion";
import ScrollReveal from "../ScrollReveal";
import ProjectStackCard from "./ProjectStackCard";
import { allProjects, featuredProject, type Project } from "@/data/projects";

/* ── Mobile: individual sticky card with scale ── */
function MobileCard({
  project,
  index,
  progress,
  range,
  targetScale,
}: {
  project: Project;
  index: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}) {
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div className="sticky top-0 flex h-screen items-center justify-center px-4 sm:px-6">
      <motion.div
        className="w-full origin-top"
        style={{ scale, top: `calc(-5vh + ${index * 25}px)` }}
      >
        <ProjectStackCard project={project} index={index} />
      </motion.div>
    </div>
  );
}

/* ── Desktop: card counter ── */
function CardCounter({
  progress,
  total,
}: {
  progress: MotionValue<number>;
  total: number;
}) {
  const [current, setCurrent] = useState(1);

  useMotionValueEvent(progress, "change", (v) => {
    setCurrent(Math.min(Math.round(v * (total - 1)) + 1, total));
  });

  return (
    <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-2 font-mono text-sm text-text-3">
      <span className="text-text">{String(current).padStart(2, "0")}</span>
      <span>/</span>
      <span>{String(total).padStart(2, "0")}</span>
    </div>
  );
}

/* ── Main section ── */
export default function ProjectsSection() {
  const otherProjects = allProjects.filter(
    (p) => p.slug !== featuredProject.slug,
  );
  const N = otherProjects.length;

  /* Refs for both layouts */
  const desktopRef = useRef<HTMLDivElement>(null);
  const desktopStickyRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: desktopProgress } = useScroll({
    target: desktopRef,
    offset: ["start start", "end end"],
  });

  const { scrollYProgress: mobileProgress } = useScroll({
    target: mobileRef,
    offset: ["start start", "end end"],
  });

  /* Desktop: map vertical scroll → horizontal translation */
  const x = useTransform(
    desktopProgress,
    (v) => `${-v * (N - 1) * 100}vw`,
  );

  /* Desktop: wheel snap + idle snap */
  useEffect(() => {
    const sticky = desktopStickyRef.current;
    const container = desktopRef.current;
    if (!sticky || !container) return;

    let locked = false;
    let idleTimer: ReturnType<typeof setTimeout>;

    const getCardInfo = () => {
      const rect = container.getBoundingClientRect();
      const inSticky = rect.top <= 0 && rect.bottom >= window.innerHeight;
      if (!inSticky) return null;

      const scrollRange = container.offsetHeight - window.innerHeight;
      const currentScroll = -rect.top;
      const progress = scrollRange > 0 ? currentScroll / scrollRange : 0;
      const nearest = Math.round(progress * (N - 1));
      const exactProgress = nearest / (N - 1);
      const isSnapped = Math.abs(progress - exactProgress) < 0.005;
      const containerTop = window.scrollY + rect.top;

      return { progress, nearest, exactProgress, isSnapped, containerTop, scrollRange };
    };

    const snapTo = (cardIndex: number, info: NonNullable<ReturnType<typeof getCardInfo>>) => {
      locked = true;
      const target = info.containerTop + (cardIndex / (N - 1)) * info.scrollRange;
      window.scrollTo({ top: target, behavior: "smooth" });
      setTimeout(() => { locked = false; }, 500);
    };

    /* Idle snap: scroll이 멈추면 가장 가까운 카드로 보정 */
    const onScroll = () => {
      if (locked) return;
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        const info = getCardInfo();
        if (!info || info.isSnapped) return;
        snapTo(info.nearest, info);
      }, 150);
    };

    /* Wheel snap: 한 틱에 카드 한 장 */
    const onWheel = (e: WheelEvent) => {
      clearTimeout(idleTimer);
      const info = getCardInfo();
      if (!info) return;

      if (locked) {
        e.preventDefault();
        return;
      }

      const dir = e.deltaY > 0 ? 1 : -1;
      const next = info.nearest + dir;

      if (next < 0 || next >= N) {
        if (info.isSnapped) return;
        e.preventDefault();
        snapTo(info.nearest, info);
        return;
      }

      e.preventDefault();
      snapTo(next, info);
    };

    sticky.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      sticky.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      clearTimeout(idleTimer);
    };
  }, [N]);

  return (
    <section id="projects" className="py-32">
      {/* ── Section header ── */}
      <div className="mx-auto max-w-6xl px-6 lg:px-0">
        <ScrollReveal>
          <div className="flex items-end justify-between border-b border-border pb-6">
            <div>
              <span className="section-num font-mono text-6xl font-bold sm:text-8xl lg:text-9xl">
                01
              </span>
              <div className="mt-2 flex items-center gap-4">
                <div className="h-px w-12 bg-accent" />
                <h2 className="text-xs font-medium uppercase tracking-[0.3em] text-accent lg:text-sm">
                  Projects
                </h2>
              </div>
            </div>
            <p className="hidden text-sm text-text-3 sm:block lg:text-base">
              {allProjects.length} projects
            </p>
          </div>
        </ScrollReveal>
      </div>

      {/* ── Featured project ── */}
      <div className="mx-auto max-w-6xl px-6 lg:px-0">
        <ScrollReveal delay={100}>
          <div className="mt-16 grid gap-8 lg:grid-cols-[1fr,1.2fr] lg:gap-16">
            {/* Left: meta */}
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-white lg:px-4 lg:text-sm">
                  Featured
                </span>
                <span className="text-xs text-text-3 lg:text-sm">
                  {featuredProject.scope}
                </span>
              </div>

              <h3 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                {featuredProject.title}
              </h3>
              <p className="mt-2 text-lg text-text-2 lg:text-xl">
                {featuredProject.subtitle}
              </p>

              <div className="mt-6 space-y-3 text-sm text-text-2 lg:space-y-4 lg:text-base">
                <div className="flex items-center gap-3">
                  <span className="w-14 shrink-0 text-xs uppercase tracking-widest text-text-3 lg:w-16 lg:text-sm">
                    Period
                  </span>
                  <span>{featuredProject.period}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-14 shrink-0 text-xs uppercase tracking-widest text-text-3 lg:w-16 lg:text-sm">
                    Role
                  </span>
                  <span>{featuredProject.role}</span>
                </div>
                {featuredProject.org && (
                  <div className="flex items-center gap-3">
                    <span className="w-14 shrink-0 text-xs uppercase tracking-widest text-text-3 lg:w-16 lg:text-sm">
                      Org
                    </span>
                    <span>{featuredProject.org}</span>
                  </div>
                )}
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {featuredProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border px-3 py-1 text-xs text-text-2 lg:px-4 lg:text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {featuredProject.github && (
                <a
                  href={featuredProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-8 inline-flex items-center gap-3 text-sm font-medium text-text-2 transition-colors hover:text-accent lg:text-base"
                >
                  <span className="h-px w-6 bg-text-3 transition-all group-hover:w-10 group-hover:bg-accent" />
                  View on GitHub
                </a>
              )}
            </div>

            {/* Right: contributions */}
            <div className="rounded-2xl border border-border border-t-[3px] border-t-accent bg-surface p-6 sm:p-8 lg:p-10">
              <p className="mb-6 text-xs font-medium uppercase tracking-widest text-text-3 lg:mb-8 lg:text-sm">
                Key Contributions
              </p>
              <ul className="space-y-4 lg:space-y-5">
                {featuredProject.contributions.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-4 text-sm text-text-2 lg:text-base"
                  >
                    <span className="mt-0.5 font-mono text-xs text-accent lg:text-sm">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* ── Divider ── */}
      <div className="mx-auto max-w-6xl px-6 lg:px-0">
        <div className="mt-24 flex items-center gap-4">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs uppercase tracking-widest text-text-3 lg:text-sm">
            All Projects
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>
      </div>

      {/* ── Desktop: horizontal scroll ── */}
      <div
        ref={desktopRef}
        className="relative mt-12 hidden lg:block"
        style={{ height: `${N * 100}vh` }}
      >
        <div ref={desktopStickyRef} className="sticky top-0 h-screen overflow-hidden">
          <motion.div className="flex h-full" style={{ x }}>
            {otherProjects.map((project, i) => (
              <div
                key={project.slug}
                className="flex h-full w-screen shrink-0 items-center justify-center px-8"
              >
                <ProjectStackCard project={project} index={i} />
              </div>
            ))}
          </motion.div>
          <CardCounter progress={desktopProgress} total={N} />
        </div>
      </div>

      {/* ── Mobile: vertical sticky stack ── */}
      <div ref={mobileRef} className="relative mt-12 lg:hidden">
        {otherProjects.map((project, i) => {
          const targetScale = 1 - (N - i) * 0.05;
          const start = i / N;
          return (
            <MobileCard
              key={project.slug}
              project={project}
              index={i}
              progress={mobileProgress}
              range={[start, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </section>
  );
}
