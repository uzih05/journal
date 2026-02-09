import type { Project } from "@/data/projects";

interface ProjectStackCardProps {
  project: Project;
  index: number;
}

export default function ProjectStackCard({ project, index }: ProjectStackCardProps) {
  return (
    <div className="w-full max-w-5xl rounded-2xl border border-border bg-surface p-6 sm:p-8 lg:p-10">
      {/* Big number */}
      <span className="section-num font-mono text-5xl font-bold sm:text-6xl lg:text-7xl">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Content grid */}
      <div className="mt-4 grid gap-6 lg:mt-6 lg:grid-cols-[1fr,1fr] lg:gap-12">
        {/* Left: meta */}
        <div>
          <h3 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
            {project.title}
          </h3>
          <p className="mt-1 text-sm text-text-2 sm:text-base lg:text-lg">
            {project.subtitle}
          </p>

          <div className="mt-4 space-y-2 text-sm text-text-2 lg:mt-6 lg:space-y-3 lg:text-base">
            <div className="flex gap-3">
              <span className="w-14 shrink-0 text-xs uppercase tracking-widest text-text-3 lg:w-16 lg:text-sm">
                Period
              </span>
              <span>{project.period}</span>
            </div>
            <div className="flex gap-3">
              <span className="w-14 shrink-0 text-xs uppercase tracking-widest text-text-3 lg:w-16 lg:text-sm">
                Role
              </span>
              <span>{project.role}</span>
            </div>
            <div className="flex gap-3">
              <span className="w-14 shrink-0 text-xs uppercase tracking-widest text-text-3 lg:w-16 lg:text-sm">
                Scope
              </span>
              <span>{project.scope}</span>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2 lg:mt-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border px-3 py-1 text-xs text-text-2 lg:px-4 lg:text-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link mt-4 inline-flex items-center gap-2 text-sm text-text-3 transition-colors hover:text-accent lg:mt-6 lg:text-base"
            >
              <span className="h-px w-4 bg-text-3 transition-all group-hover/link:w-6 group-hover/link:bg-accent" />
              GitHub
            </a>
          )}
        </div>

        {/* Right: contributions */}
        <div>
          <p className="mb-4 text-xs font-medium uppercase tracking-widest text-text-3 lg:mb-6 lg:text-sm">
            Key Contributions
          </p>
          <ul className="space-y-3 lg:space-y-4">
            {project.contributions.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-sm text-text-2 lg:text-base"
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
    </div>
  );
}
