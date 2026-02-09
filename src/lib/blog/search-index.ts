import { getAllPosts } from "./posts";
import type { SearchablePost } from "./types";

export function buildSearchIndex(): SearchablePost[] {
  return getAllPosts().map((post) => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
    tags: post.tags,
    date: post.date,
  }));
}
