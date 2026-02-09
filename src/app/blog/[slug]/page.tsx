import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getPostSlugs, getAllPosts } from "@/lib/blog/posts";
import { compileMDX, extractHeadings } from "@/lib/blog/mdx";
import type { Metadata } from "next";
import TableOfContents from "../components/TableOfContents";
import { mdxComponents } from "../components/MDXComponents";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = getPostBySlug(slug);
    return {
      title: post.title,
      description: post.description,
    };
  } catch {
    return {};
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  let post;
  try {
    post = getPostBySlug(slug);
  } catch {
    notFound();
  }

  if (!post.published) notFound();

  const headings = extractHeadings(post.content);
  const content = await compileMDX(post.content, mdxComponents);

  const allPosts = getAllPosts();
  const currentIdx = allPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIdx < allPosts.length - 1 ? allPosts[currentIdx + 1] : null;
  const nextPost = currentIdx > 0 ? allPosts[currentIdx - 1] : null;

  return (
    <div className="relative">
      {/* Back link */}
      <Link
        href="/blog"
        className="group mb-10 inline-flex items-center gap-3 text-sm text-text-3 transition-colors hover:text-accent lg:text-base"
      >
        <svg
          className="h-4 w-4 transition-transform group-hover:-translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
          aria-hidden="true"
        >
          <path d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
        </svg>
        Back to Blog
      </Link>

      {/* Editorial post header */}
      <header className="border-b border-border pb-8">
        <div className="flex items-center gap-3">
          <time className="text-xs text-text-3 lg:text-sm">{post.date}</time>
          <span className="text-xs text-text-3">&middot;</span>
          <span className="text-xs text-text-3 lg:text-sm">{post.readingTime}</span>
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          {post.title}
        </h1>
        <p className="mt-3 text-base text-text-2 lg:text-lg">{post.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border px-3 py-1 text-xs text-text-3 lg:text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      {/* TOC + Content */}
      <div className="relative mt-12 lg:flex lg:gap-12">
        <article className="prose prose-neutral max-w-none flex-1 dark:prose-invert">
          {content}
        </article>

        {headings.length > 0 && (
          <aside className="hidden lg:block">
            <TableOfContents headings={headings} />
          </aside>
        )}
      </div>

      {/* Prev/Next — editorial style */}
      {(prevPost || nextPost) && (
        <div className="mt-16 border-t border-border pt-10">
          <div className="grid gap-8 sm:grid-cols-2">
            {prevPost ? (
              <Link
                href={`/blog/${prevPost.slug}`}
                className="group"
              >
                <span className="text-xs uppercase tracking-widest text-text-3 lg:text-sm">
                  &larr; 이전 글
                </span>
                <p className="mt-2 text-lg font-semibold tracking-tight transition-colors group-hover:text-accent lg:text-xl">
                  {prevPost.title}
                </p>
              </Link>
            ) : (
              <div />
            )}
            {nextPost ? (
              <Link
                href={`/blog/${nextPost.slug}`}
                className="group text-right"
              >
                <span className="text-xs uppercase tracking-widest text-text-3 lg:text-sm">
                  다음 글 &rarr;
                </span>
                <p className="mt-2 text-lg font-semibold tracking-tight transition-colors group-hover:text-accent lg:text-xl">
                  {nextPost.title}
                </p>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
