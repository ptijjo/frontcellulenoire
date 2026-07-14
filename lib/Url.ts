const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8080";

const Url = {
    connection: baseUrl + "/login",
    createUser: baseUrl + "/users",
    decodage: baseUrl + "/users_decodeToken",
    userById: baseUrl + "/users",
    getBooks: baseUrl + "/books",
    addBooks: baseUrl + "/books",
    nbBooks: baseUrl + "/books_totalBooks",
    getCategory: baseUrl + "/categories",
    updateAvatar: baseUrl + "/users_updateAvatar",
    resetPassword: baseUrl + "/users_resetPassword",
    forgetPassword: baseUrl + "/users_forgetPassword",
    updateRole: baseUrl + "/users_updateRole",
    downloadBook: baseUrl + "/books_download",
    logout: baseUrl + "/logout",
    booksHome: baseUrl + "/books_home",
    adminDashboard: baseUrl + "/admin_dashboard",
    booksPublish: baseUrl + "/books_publish",
    booksFeatured: baseUrl + "/books_featured",
};

export default Url;
