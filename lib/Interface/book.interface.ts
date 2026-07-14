export interface Book {
  id: string;
  title: string;
  author: string;
  categoryId: string;
  uploadedAt: Date;
  isPublished?: boolean;
  isFeatured?: boolean;
  category?: {
    id: string;
    type: string;
  };
}

export interface BookHomeOverview {
  featuredBook: Book | null;
  recentBooks: Book[];
  categoryCounts: Array<{
    type: string;
    count: number;
  }>;
}
