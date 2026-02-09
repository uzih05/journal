export interface TechCategory {
  category: string;
  items: string;
}

export const techStack: TechCategory[] = [
  { category: "Language", items: "TypeScript, Python, Go, Java, C" },
  { category: "Backend", items: "FastAPI, Spring Boot, Go net/http" },
  { category: "Frontend", items: "Next.js, React, Tailwind CSS" },
  { category: "Realtime", items: "WebSocket, WebRTC, SSE" },
  { category: "Infra", items: "Docker, GitHub Actions, Azure" },
  { category: "Database", items: "Weaviate, H2, SQLite" },
];
