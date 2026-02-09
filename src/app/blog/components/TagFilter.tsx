"use client";

import { useState } from "react";
import Link from "next/link";
import type { PostMeta } from "@/lib/blog/types";

interface TagFilterProps {
  tags: string[];
  posts: PostMeta[];
}

export default function TagFilter({ tags, posts }: TagFilterProps) {
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  };

  const filteredPosts =
    selectedTags.size === 0
      ? posts
      : posts.filter((p) => p.tags.some((t) => selectedTags.has(t)));

  return (
    <div>
      {/* Tag filter pills */}
      <div className="mb-10 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            className={`cursor-pointer rounded-full border px-3 py-1 text-xs transition-all lg:text-sm lg:px-4 ${
              selectedTags.size === 0 || selectedTags.has(tag)
                ? "border-border text-text-2 hover:border-accent hover:text-accent"
                : "border-border/50 text-text-3/50"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Numbered editorial post list */}
      <div>
        {filteredPosts.map((post, i) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex items-start gap-6 border-b border-border py-8 transition-colors sm:gap-10 lg:py-10"
          >
            <span className="font-mono text-sm text-text-3 transition-colors group-hover:text-accent lg:text-base">
              {String(i + 1).padStart(2, "0")}
            </span>

            <div className="flex-1">
              <div className="flex items-center gap-3">
                <time className="text-xs text-text-3 lg:text-sm">{post.date}</time>
                <span className="text-xs text-text-3">&middot;</span>
                <span className="text-xs text-text-3 lg:text-sm">{post.readingTime}</span>
              </div>
              <h2 className="mt-2 text-xl font-semibold tracking-tight transition-colors group-hover:text-accent lg:text-2xl">
                {post.title}
              </h2>
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

            <svg
              className="mt-2 h-5 w-5 shrink-0 text-text-3 transition-all group-hover:translate-x-1 group-hover:text-accent lg:h-6 lg:w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
              aria-hidden="true"
            >
              <path d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
            </svg>
          </Link>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <p className="py-16 text-center text-sm text-text-2 lg:text-base">
          선택한 태그에 해당하는 글이 없습니다.
        </p>
      )}
    </div>
  );
}
