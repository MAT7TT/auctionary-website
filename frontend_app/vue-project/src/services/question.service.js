const getItemQuestions = (itemId) => {
    return fetch(`http://localhost:3333/item/${itemId}/question`)
    .then(res => {
        if (res.status === 200) return res.json()
        if (res.status === 404) return res.json()
        throw "Failed to load questions"
    })
    .catch(err => {
        console.log(err)
        return Promise.reject(err)
    })
}

const askQuestion = (itemId, questionText) => {
    const token = localStorage.getItem("session_token")

    return fetch(`http://localhost:3333/item/${itemId}/question`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Authorization": token
        },
        body: JSON.stringify({
            question_text: questionText
        })
    })
    .then(res => {
        if (res.status === 200) return 
        if (res.status === 400) throw "Bad Request"
        if (res.status === 401) throw "You must be logged in"
        if (res.status === 403) throw "You cannot ask a question on your own item"
        if (res.status === 404) throw "Not Found"
        if (res.status === 405) throw "This auction has ended"
        if (res.status === 406) throw new Error("Profanity is not allowed")
        throw "Failed to ask question"
    })
    .catch(err => {
        console.log(err)
        return Promise.reject(err)
    })
}

const answerQuestion = (questionId, answerText) => {
    const token = localStorage.getItem("session_token")

    return fetch(`http://localhost:3333/question/${questionId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Authorization": token
        },
        body: JSON.stringify({
            answer_text: answerText
        })
    })
    .then(res => {
        if (res.status === 200) return 
        if (res.status === 400) throw "Bad Request"
        if (res.status === 401) throw "You must be logged in"
        if (res.status === 403) throw "Only the seller can answer questions on their items"
        if (res.status === 404) throw "Not Found"
        if (res.status === 405) throw "This auction has ended"
        if (res.status === 406) throw new Error("Profanity is not allowed")
        throw "Failed to ask question"
    })
    .catch(err => {
        console.log(err)
        return Promise.reject(err)
    })
}
export const questionService = { answerQuestion, askQuestion, getItemQuestions }