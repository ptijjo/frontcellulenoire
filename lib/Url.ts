const baseUrl="http://127.0.0.1:8080"

const Url = {
    connection: baseUrl + "/users_connection",
    decodage: baseUrl + "/users_decodage",
    userById: baseUrl + "/users",
    getBooks: baseUrl + "/books",
    addBooks: baseUrl + "/books",
    getCategory: baseUrl + "/categories",
    updateAvatar:baseUrl + "/users_updateAvatar",
}

export default Url;