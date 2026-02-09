import { getAllPosts, getAllTags } from "@/lib/blog/posts";
import { buildSearchIndex } from "@/lib/blog/search-index";
import TagFilter from "./components/TagFilter";
import SearchBar from "./components/SearchBar";

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();
  const searchIndex = buildSearchIndex();

  return (
    <div>
      {/* Magazine header */}
      <header className="border-b border-border pb-8">
        <div className="mb-4 flex items-center gap-4">
          <div className="h-px w-12 bg-accent" />
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-accent lg:text-sm">
            Journal
          </span>
        </div>
        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
          Blog
        </h1>
        <p className="mt-4 text-base text-text-2 lg:text-lg">
          개발하며 배운 것들을 기록합니다.
        </p>
      </header>

      {/* Search + Filter */}
      <div className="mt-10">
        <SearchBar posts={searchIndex} />
        <TagFilter tags={tags} posts={posts} />
      </div>
    </div>
  );
}
