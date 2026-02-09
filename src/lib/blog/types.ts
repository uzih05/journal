export interface PostFrontmatter {
  title: string;
  description: string;
  date: string;
  tags: string[];
  published: boolean;
  thumbnail?: string;
}

export interface PostMeta extends PostFrontmatter {
  slug: string;
  readingTime: string;
}

export interface PostData extends PostMeta {
  content: string;
}

export interface TOCHeading {
  id: string;
  text: string;
  level: number;
}

export interface SearchablePost {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  date: string;
}
