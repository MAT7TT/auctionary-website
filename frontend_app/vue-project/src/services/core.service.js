const createItem = (data) => {
    const token = localStorage.getItem("session_token")
    
    return fetch("http://localhost:3333/item", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Authorization": token
        },
        body: JSON.stringify(data)
    }).then(async res => {
        if (res.status === 201) return res.json()
        else if (res.status === 400) {
            const data = await res.json()
            throw data.error_message
        }
        if (res.status === 401) throw  "You must be logged in"
        if (res.status === 403) throw new Error("Profanity is not allowed")
        throw "Server error"
    })
    .catch(err => {
        console.log(err)
        return Promise.reject(err)
    })
}

const searchItems = (q, status, categoryIds, limit, offset ) => {
    let url = `http://localhost:3333/search?q=${q}&limit=${limit}&offset=${offset}`

    if (status) url += `&status=${status}`

    if (Array.isArray(categoryIds) && categoryIds.length > 0) {
        url += `&category_id=${categoryIds.join(",")}`
    }

    const token = localStorage.getItem("session_token")

    return fetch(url, {
        headers: token ? {
            "X-Authorization": token
        } : {}
    })
    .then((res) => {
        if (res.status === 200) return res.json()
        else if (res.status === 401) throw  "You must be logged in"
        throw 'Search failed'
    })
    .catch(err => {
        console.log(err)
        return Promise.reject(err)
    })
} 

const getSingleItem = (id) => {
    return fetch(`http://localhost:3333/item/${id}`)
    .then((res) => {
        if (res.status === 200) return res.json()
        else if (res.status === 404) throw "Not Found"
        throw 'Failed to fetch item'
    })
    .catch((err) => {
        console.log("Err", err)
        return Promise.reject(err)
    })
}

const getBidHistory = (id) => {
    return fetch(`http://localhost:3333/item/${id}/bid`)
    .then(res => {
        if (res.status === 200) return res.json()
        else if(res.status === 404) return "Not Found"
        throw "Failed to fetch bid history"
    })
    .catch(err => {
        console.log(err)
        return Promise.reject(err)
    })
}

const placeBid = (itemId, amount) => {
    const token = localStorage.getItem("session_token")

    return fetch(`http://localhost:3333/item/${itemId}/bid`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Authorization": token
        },
        body: JSON.stringify({
            amount: amount
        })
    })
    .then(res => {
        if (res.status === 201) return 
        if (res.status === 400) throw "Invalid Bid"
        if (res.status === 401) throw "You must be logged in to bid"
        if (res.status === 403) throw "You cannot bid on your own item"
        if (res.status === 404) throw "Item not found"
        if (res.status === 405) throw "This auction has ended"
        throw "Server error"
    })
    .catch(err => {
        console.log(err)
        return Promise.reject(err)
    })
}

const getUserProfile = (userId) => {
    const token = localStorage.getItem("session_token")
    
    return fetch(`http://localhost:3333/users/${userId}`, {
        headers: {
            "X-Authorization": token
        }
    })
    .then(res => {
        if (res.status === 200) return res.json()
        if (res.status === 401) throw "Not authorised"
        if (res.status === 404) throw "User not found"
        throw "Server error"
    })
    .catch(err => {
        console.log(err)
        return Promise.reject(err)
    })
}

export const coreService = {
    createItem, searchItems, getSingleItem, getBidHistory, placeBid, getUserProfile
}