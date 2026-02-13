const STORAGE_KEY = "item_drafts"

const getDrafts = () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
}

const saveDraft = (draft) => {
    const drafts = getDrafts()

    drafts.push({
        ...draft,
        id: Date.now(),
        saved_at: Date.now()
    })

    localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts))
}

const deleteDraft = (id) => {
    const drafts = getDrafts().filter(d => d.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts))
}

export const draftService = {
    getDrafts,
    saveDraft,
    deleteDraft
}