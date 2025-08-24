export interface BlogPost {
  id: number;
  slug: string;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  subheadings?: {
    title: string;
    content: string;
    list?: string[];
  }[];
}