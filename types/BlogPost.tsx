export interface BlogPost {
    id: number;
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