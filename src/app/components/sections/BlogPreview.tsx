import Link from "next/link";
import ScrollReveal from "../ScrollReveal";
import { getAllPosts } from "@/lib/blog/posts";

export default function BlogPreview() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <section className="py-32">
      {/* Section header */}
      <div className="mx-auto max-w-6xl px-6 lg:px-0">
        <ScrollReveal>
          <div className="flex items-end justify-between border-b border-border pb-6">
            <div>
              <span className="section-num font-mono text-6xl font-bold sm:text-8xl lg:text-9xl">
                03
              </span>
              <div className="mt-2 flex items-center gap-4">
                <div className="h-px w-12 bg-accent" />
                <h2 className="text-xs font-medium uppercase tracking-[0.3em] text-accent lg:text-sm">
                  Blog
                </h2>
              </div>
            </div>
            <Link
              href="/blog"
              className="group inline-flex items-center gap-3 text-sm text-text-3 transition-colors hover:text-accent lg:text-base"
            >
              View all
              <span className="h-px w-6 bg-text-3 transition-all group-hover:w-10 group-hover:bg-accent" />
            </Link>
          </div>
        </ScrollReveal>
      </div>

      {/* Posts */}
      <div className="mx-auto max-w-6xl px-6 lg:px-0">
        <div className="mt-12">
          {posts.map((post, i) => (
            <ScrollReveal key={post.slug} delay={100 * (i + 1)}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex items-start gap-6 border-b border-border py-8 transition-colors hover:bg-accent-bg sm:gap-10 lg:py-10 px-4 -mx-4 rounded-sm"
              >
                {/* Number */}
                <span className="font-mono text-sm text-text-3 transition-colors group-hover:text-accent lg:text-base">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <time className="text-xs text-text-3 lg:text-sm">{post.date}</time>
                    <span className="text-xs text-text-3 lg:text-sm">&middot;</span>
                    <span className="text-xs text-text-3 lg:text-sm">{post.readingTime}</span>
                  </div>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight transition-colors group-hover:text-accent lg:text-2xl">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm text-text-2 line-clamp-2 lg:text-base">
                    {post.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border px-2.5 py-0.5 text-xs text-text-3 lg:text-sm lg:px-3 lg:py-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Arrow */}
                <svg
                  className="mt-2 h-5 w-5 shrink-0 text-text-3 transition-all group-hover:translate-x-1 group-hover:text-accent lg:h-6 lg:w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                </svg>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
