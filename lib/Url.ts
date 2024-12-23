const baseUrl="https://api.cellulenoire.fr"

const Url = {
    connection: baseUrl + "/users_connection",
    createUser: baseUrl + "/users", 
    decodage: baseUrl + "/users_decodage",
    userById: baseUrl + "/users",
    getBooks: baseUrl + "/books",
    addBooks: baseUrl + "/books",
    getCategory: baseUrl + "/categories",
    updateAvatar:baseUrl + "/users_updateAvatar",
}

export default Url;