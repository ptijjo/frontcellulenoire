const baseUrl="http://api.cellulenoire.fr"

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