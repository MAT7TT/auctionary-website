<template>
    <div class="max-w-2xl mx-auto px-6 py-10">

        <!-- Title -->
        <h1 class="text-2xl text-gray-500 font-semibold mb-6">
            Create New item
        </h1>

        <!-- Form Card -->
        <form 
            @submit.prevent="submitItem"
            class="bg-white border border-gray-200 rounded-lg p-6 space-y-5"
        >
            <!-- Item Name -->
            <div>
                <label class="text-gray-500 block text-sm font-medium mb-1">
                    Item name
                </label>
                <input
                    v-model="name"
                    type="text"
                    required
                    class="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                />
            </div>

            <!-- Description -->
            <div>
                <label class="text-gray-500 block text-sm font-medium mb-1">
                    Description
                </label>
                <textarea  
                    v-model="description"
                    type="text"
                    required
                    class="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                ></textarea>
            </div>

            <!-- Staring Bid -->
            <div>
                <label class="text-gray-500 block text-sm font-medium mb-1">
                    Starting bid (£)
                </label>
                <input
                    v-model.number="starting_bid"
                    type="number"
                    min="1"
                    required
                    class="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                />
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label class="text-gray-500 block text-sm font-medium mb-1">
                        End date
                    </label>
                    <input 
                        v-model="endDate"
                        type="date"
                        :min="minDate"
                        required
                        class="w-full border rounded-md px-3 py-2"
                    />
                </div>

                <div>
                    <label class="text-gray-500 block text-sm font-medium mb-1">
                        End time
                    </label>
                    <input
                        v-model="endTime"
                        type="time"
                        required
                        class="w-full border rounded-md px-3 py-2"
                     />
                </div>
            </div>

            <!-- Image URL-->
            <div>
                <label class="text-gray-500 block text-sm font-medium mb-1">
                    Image URL (optional)
                </label>
                <input
                    v-model="imageUrl"
                    type="text"
                    class="w-full border rounded-md px-3 py-2"
                />
            </div>
            
            <!-- Categories -->
            <div>
                <h3 class="text-gray-500 block text-sm font-medium mb-1">
                    Categories (optional)
                </h3>
                <div class="flex flex-wrap gap-2">
                    <label v-for="cat in categories" :key="cat.category_id" class="cursor-pointer">
                        <input 
                            type="checkbox"
                            :value="cat.category_id"
                            v-model="selectedCategoryIds"
                            class="hidden peer"
                        />
                        <span 
                            class="
                                inline-block px-4 py-1.5 text-sm rounded-full
                                bg-pink-100
                                hover:bg-pink-300
                                text-gray-700
                                transition
                                peer-checked:bg-pink-500
                                peer-checked:text-white
                                "
                            >
                                {{ cat.name }}
                            </span>
                    </label>
                </div>
            </div>

            <!-- Error -->
            <p v-if="error" class="text-red-600 text-sm">
                {{ error }}
            </p>

            <!-- Save Draft -->
            <button 
                type="button"
                @click="saveDraft"
                class="w-full bg-pink-100 border border-pink-100 py-2 rounded-md hover:bg-pink-300 transition"
            >
                Save Draft
            </button>

            <!-- Submit -->
            <button 
                type="submit" 
                :disabled="loading"
                class="w-full bg-black text-white py-2 rounded-md hover:bg-pink-500 transition disabled:opacity-60"
            >
                <span v-if="loading">
                    {{ isEditing ? "Publishing..." : "Creating..." }}
                </span>
                <span v-else>
                    {{ isEditing ? "Publish Item": "Create Item" }}
                </span>
            </button>
        </form>
    </div>
</template>

<script>
import { coreService } from "../../services/core.service"
import { categoryService } from "@/services/categories.service"
import { draftService } from "@/services/draft.service"

export default {
    name: "CreateItem",
    data() {
        return {
            name: "",
            description: "",
            starting_bid: null,
            endDate: "",
            endTime: "12:00",
            imageUrl: "",
            loading: false,
            error: "",

            categories: [],
            selectedCategoryIds: [],
        }
    },
    mounted() {
        categoryService.getCategories()
        .then(cats => {
            this.categories = cats
        })
        
        const draftId = this.$route.query.draftId
        if (!draftId) return 

        const draft = draftService.getDrafts()
            .find(d => d.id == draftId)

        if(!draft) return

        this.name = draft.name
        this.description = draft.description
        this.starting_bid = draft.starting_bid
        this.imageUrl = draft.image_url
        this.selectedCategoryIds = draft.categories || []

        if (draft.end_date) {
            const date = new Date(draft.end_date)
            this.endDate = date.toISOString().split("T")[0]
            this.endTime = date.toTimeString().slice(0, 5)
        }
    },
    computed: {
        isEditing() {
            return !!this.$route.query.draftId
        },
        minDate() {
            return new Date().toISOString().split("T")[0]
        }
    },
    methods: {
        saveDraft() {
            draftService.saveDraft({
                name: this.name,
                description: this.description,
                starting_bid: this.starting_bid,
                end_date: this.endDate && this.endTime
                    ? Math.floor(new Date(`${this.endDate}T${this.endTime}`).getTime())
                    : null,
                image_url: this.imageUrl || null,
                categories: this.selectedCategoryIds
            })
            this.$router.push('/profile#drafts')
            alert("Draft saved locally")
        },  
        submitItem() {
            this.error = ""
            this.loading = true

            const endTimestamp = Math.floor(
                new Date(`${this.endDate}T${this.endTime}`).getTime()  / 1000
            )

            if (endTimestamp <= Date.now() / 1000) {
                this.error = "Auction end must be in the future"
                this.loading = false
                return
            }

            coreService.createItem({
                name: this.name,
                description: this.description,
                starting_bid: this.starting_bid,
                end_date: endTimestamp,
                image_url: this.imageUrl || null,
                categories: this.selectedCategoryIds
            })
            .then(res => {
                this.$router.push(`/item/${res.item_id}`);
            })
            .catch(err => {
                this.error = err?.message || err?.error_message || err
            })
            .finally(() => {
                this.loading = false
            })
        }
    }
}
</script>

