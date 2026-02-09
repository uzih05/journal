import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Jiheon Yu Blog",
    default: "Blog | Jiheon Yu",
  },
  description: "개발 블로그 — Jiheon Yu",
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen pt-28 pb-32">
      <main className="mx-auto max-w-6xl px-6 lg:px-0">
        {children}
      </main>
    </div>
  );
}
