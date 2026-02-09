import ScrollReveal from "../ScrollReveal";
import { profile } from "@/data/profile";

export default function ContactSection() {
  return (
    <section id="contact" className="bg-surface py-32">
      {/* Section header */}
      <div className="mx-auto max-w-6xl px-6 lg:px-0">
        <ScrollReveal>
          <div className="flex items-end justify-between border-b border-border pb-6">
            <div>
              <span className="section-num font-mono text-6xl font-bold sm:text-8xl lg:text-9xl">
                04
              </span>
              <div className="mt-2 flex items-center gap-4">
                <div className="h-px w-12 bg-accent" />
                <h2 className="text-xs font-medium uppercase tracking-[0.3em] text-accent lg:text-sm">
                  Contact
                </h2>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <div className="mx-auto max-w-6xl px-6 lg:px-0">
        <ScrollReveal delay={100}>
          <div className="mt-16">
            <h3 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Let&apos;s work
              <br />
              <span className="text-accent">together.</span>
            </h3>
            <p className="mt-6 max-w-md text-base leading-relaxed text-text-2 lg:text-lg">
              새로운 프로젝트, 협업, 또는 대화에 항상 열려 있습니다.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-full border border-border px-6 py-3 text-sm font-medium text-text-2 transition-all hover:border-accent hover:text-accent lg:text-base lg:px-8 lg:py-4"
              >
                <svg className="h-4 w-4 lg:h-5 lg:w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
                <span className="h-px w-4 bg-text-3 transition-all group-hover:w-8 group-hover:bg-accent" />
              </a>
              {profile.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="group inline-flex items-center gap-3 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 lg:text-base lg:px-8 lg:py-4"
                >
                  Email
                  <span className="h-px w-4 bg-white/40 transition-all group-hover:w-8 group-hover:bg-white/80" />
                </a>
              )}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
