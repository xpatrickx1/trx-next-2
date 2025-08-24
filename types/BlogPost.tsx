export interface BlogPost {
    slug: string;
    date: string;
    readTime: string;
    title: string;
    excerpt: string;
    imageUrl: string;
    subheadings?: {
      title: string;
      content: {
        text: string;
        list?: string[];
      };
    }[];
  }