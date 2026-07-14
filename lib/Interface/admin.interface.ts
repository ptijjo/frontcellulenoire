export interface AdminDashboardStats {
  totals: {
    books: number;
    publishedBooks: number;
    unpublishedBooks: number;
    users: number;
    downloadsThisMonth: number;
    newUsersThisMonth: number;
  };
  topDownloadedBooks: Array<{
    id: string;
    title: string;
    author: string;
    category: string;
    downloadCount: number;
    isPublished: boolean;
    isFeatured: boolean;
  }>;
  activeUsers: Array<{
    id: string;
    pseudo: string;
    role: string;
    downloadCount: number;
  }>;
  emptyCategories: Array<{
    id: string;
    type: string;
  }>;
  unpublishedBooks: Array<{
    id: string;
    title: string;
    author: string;
  }>;
}
