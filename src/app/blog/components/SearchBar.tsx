"use client";

import { useState, useMemo } from "react";
import Fuse from "fuse.js";
import Link from "next/link";
import type { SearchablePost } from "@/lib/blog/types";

interface SearchBarProps {
  posts: SearchablePost[];
}

export default function SearchBar({ posts }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const fuse = useMemo(
    () =>
      new Fuse(posts, {
        keys: ["title", "description", "tags"],
        threshold: 0.3,
        includeScore: true,
      }),
    [posts],
  );

  const results = query.length > 1 ? fuse.search(query).slice(0, 5) : [];

  return (
    <div className="relative mb-10">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="글 검색..."
        className="w-full border-b-2 border-border bg-transparent px-1 py-3 text-sm text-text placeholder-text-3 outline-none transition-colors focus:border-accent lg:text-base"
      />
      {results.length > 0 && (
        <div className="absolute top-full left-0 z-10 mt-1 w-full max-h-60 overflow-y-auto border border-border bg-surface py-1">
          {results.map(({ item }) => (
            <Link
              key={item.slug}
              href={`/blog/${item.slug}`}
              className="flex items-baseline gap-3 px-3 py-2.5 text-sm transition-colors hover:bg-surface-2 lg:text-base"
              onClick={() => setQuery("")}
            >
              <span className="font-medium text-text">{item.title}</span>
              <span className="text-xs text-text-3 lg:text-sm">{item.date}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
