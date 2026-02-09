import ScrollReveal from "../ScrollReveal";
import { techStack } from "@/data/techstack";
import { timeline } from "@/data/profile";

export default function TechTimeline() {
  return (
    <section id="stack" className="bg-surface py-32">
      {/* Section header */}
      <div className="mx-auto max-w-6xl px-6 lg:px-0">
        <ScrollReveal>
          <div className="flex items-end justify-between border-b border-border pb-6">
            <div>
              <span className="section-num font-mono text-6xl font-bold sm:text-8xl lg:text-9xl">
                02
              </span>
              <div className="mt-2 flex items-center gap-4">
                <div className="h-px w-12 bg-accent" />
                <h2 className="text-xs font-medium uppercase tracking-[0.3em] text-accent lg:text-sm">
                  Stack & Journey
                </h2>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <div className="mx-auto max-w-6xl px-6 lg:px-0">
        <div className="mt-16 grid gap-16 lg:grid-cols-[1.2fr,1fr]">
          {/* Left: Tech Stack — editorial list */}
          <ScrollReveal delay={100}>
            <div>
              <p className="mb-8 text-xs font-medium uppercase tracking-widest text-text-3 lg:text-sm">
                Technologies
              </p>
              <div className="space-y-0">
                {techStack.map((cat, i) => (
                  <div
                    key={cat.category}
                    className="flex items-start gap-6 border-b border-border py-5 lg:py-6"
                  >
                    <span className="mt-0.5 font-mono text-xs text-accent lg:text-sm">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="text-sm font-semibold lg:text-lg">{cat.category}</p>
                      <p className="mt-1 text-sm text-text-2 lg:text-base">{cat.items}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Timeline + Quote */}
          <div>
            <ScrollReveal delay={200}>
              <p className="mb-8 text-xs font-medium uppercase tracking-widest text-text-3 lg:text-sm">
                Timeline
              </p>
              <div className="relative space-y-8 pl-8 lg:space-y-10">
                {/* Vertical line */}
                <div className="absolute top-1 left-[3px] h-[calc(100%-8px)] w-px bg-border" />

                {timeline.map((item, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-8 top-1 h-[7px] w-[7px] rounded-full border-2 border-accent bg-bg" />
                    <p className="text-xs font-medium uppercase tracking-widest text-accent lg:text-sm">
                      {item.year}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-text-2 lg:text-base">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollReveal>

          </div>
        </div>
      </div>
    </section>
  );
}
