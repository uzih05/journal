import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t-2 border-t-accent">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-0">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
          {/* Left: editorial brand */}
          <div>
            <p className="text-2xl font-bold tracking-tighter sm:text-3xl">
              JH.
            </p>
            <p className="mt-2 text-xs uppercase tracking-widest text-text-3">
              Developer Portfolio &mdash; 2026
            </p>
          </div>

          {/* Right: links */}
          <div className="flex items-center gap-8">
            <Link
              href="https://github.com/uzih05"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-xs uppercase tracking-widest text-text-3 transition-colors hover:text-accent"
            >
              GitHub
              <span className="h-px w-3 bg-text-3 transition-all group-hover:w-6 group-hover:bg-accent" />
            </Link>
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-xs uppercase tracking-widest text-text-3 transition-colors hover:text-accent"
            >
              Blog
              <span className="h-px w-3 bg-text-3 transition-all group-hover:w-6 group-hover:bg-accent" />
            </Link>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6">
          <p className="text-[10px] uppercase tracking-widest text-text-3">
            &copy; 2026 Jiheon Yu. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
