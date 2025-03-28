const baseUrl="http://127.0.0.1:8080"

const Url = {
    connection: baseUrl + "/users_connection",
    createUser: baseUrl + "/users", 
    decodage: baseUrl + "/users_decodage",
    userById: baseUrl + "/users",
    getBooks: baseUrl + "/books",
    addBooks: baseUrl + "/books",
    nbBooks: baseUrl + "/books_totalBooks",
    getCategory: baseUrl + "/categories",
    updateAvatar: baseUrl + "/users_updateAvatar",
    resetPassword: baseUrl + "/users_resetPassword",
    forgetPassword: baseUrl + "/users_forgetPassword",
    updateRole: baseUrl + "/users_updateRole",
    downloadBook: baseUrl+"/books_download",
}

export default Url;