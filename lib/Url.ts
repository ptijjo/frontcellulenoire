const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8080";

const Url = {
  connection: "/login",
  createUser: "/users",
  decodage: "/users_decodeToken",
  userById: "/users",
  getBooks: "/books",
  addBooks: "/books",
  nbBooks: "/books_totalBooks",
  getCategory: "/categories",
  resetPassword: "/users_resetPassword",
  forgetPassword: "/users_forgetPassword",
  updateRole: "/users_updateRole",
  downloadBook: "/books_download",
  logout: "/logout",
  booksHome: "/books_home",
  adminDashboard: "/admin_dashboard",
  booksPublish: "/books_publish",
  booksFeatured: "/books_featured",
  /** @deprecated use relative paths with apiClient; kept for absolute blob downloads if needed */
  baseUrl,
};

export default Url;
