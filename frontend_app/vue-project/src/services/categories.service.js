const getCategories = () => {
    return fetch("http://localhost:3333/categories")
    .then((res) => {
        if (res.status === 200) return res.json()
        throw "Failed to load categories"
    })
    .catch((err) => {
        console.log(err)
        return Promise.reject(err)
    })
}

export const categoryService = {
    getCategories
}