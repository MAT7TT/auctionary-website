const register = (user) => {
    return fetch("http://localhost:3333/users",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        }
    )
    .then(async res => {
        if (res.status === 201) return res.json();
        else if (res.status === 400) {
            const data = await res.json()
            throw data.error_message
        }
        throw 'Something went wrong'
    })
    .catch((err) => {
        console.log("Err", err)
        return Promise.reject(err)
    })
}

const login = (email, password) => {
    return fetch("http://localhost:3333/login",
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        }
    )
    .then(async (res) => {
        if (res.status === 200) return res.json()
        else if (res.status === 400) {
            const data = await res.json()
            throw data.error_message
        }
        throw 'Something went wrong'
    })
    .then((resJson) => {
        localStorage.setItem("user_id", resJson.user_id)
        localStorage.setItem("session_token", resJson.session_token)
        window.dispatchEvent(new Event("auth-changed"))
        return resJson
    })
    .catch((err) => {
        console.log("Err", err)
        return Promise.reject(err)
    })
}

const logout = () => {
    return fetch("http://localhost:3333/logout",
        {
            method: 'POST',
            headers: {
                "X-Authorization": localStorage.getItem("session_token")
            }
        }
    )
    .then((res) => {
        if (res.status === 200) return
        else if (response.status === 401) throw 'Unauthorised'
        throw 'Something went wrong'
    })
    .then(() => {
        localStorage.clear()
    })
    .catch((err) => {
        console.log(err)
        localStorage.clear()
        return Promise.reject(err)
    })
}

export const authService = {
    login,
    register,
    logout
}