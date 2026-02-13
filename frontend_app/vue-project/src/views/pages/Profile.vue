<template>
    <div class="px-6 py-10 max-w-5xl mx-auto">

        <!-- Header -->
         <div class="mb-10">
            <h1 class="text-2xl text-gray-500 font-semibold">
                {{ user.first_name }} {{ user.last_name }}
            </h1>
            <p class="text-gray-500 text-sm">
                Your account overview
            </p>
         </div>
        
        <!-- Selling -->
        
        <section class="mb-14">
            <h2 class="text-lg font-medium mb-6">Selling</h2>

             <div
                v-if="user.selling.length === 0"
                class="text-gray-500"
            >
                No active listings
            </div>  

            <ul v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <li
                    v-for="item in user.selling"
                    :key="item.item_id"
                    @click="$router.push('/item/' + item.item_id)"
                    class="bg-white overflow-hidden cursor-pointer shadow-md transition hover:-translate-y-1"
                >
                    <img
                        :src="item?.image_url || placeholder"
                        class="w-full h-56 object-cover"
                    />

                    <div class="p-4 space-y-1">
                        <h3 class="font-meduium text-base">{{ item.name }}</h3>
                        <p class="text-sm text-gray-500 line-clamp-2">{{ item.description }}</p>
                        <span class="text-xs text-gray-400 pt-2">
                            Ends {{ formatDate(item.end_date) }}
                        </span>
                    </div>
                </li>
            </ul>
        </section>
       
        <!-- Bidding -->
        
        <section class="mb-14">
            <h2 class="text-lg font-medium mb-6">Bidding</h2>

             <div
            v-if="user.bidding_on.length === 0"
            class="text-gray-500"
            >
                Not bidding on anything
            </div>  

            <ul v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <li
                    v-for="item in user.bidding_on"
                    :key="item.item_id"
                    @click="$router.push('/item/' + item.item_id)"
                    class="bg-white overflow-hidden cursor-pointer shadow-md transition hover:-translate-y-1"
                >
                    <img
                        :src="item?.image_url || placeholder"
                        class="w-full h-56 object-cover"
                    />
                    
                    <div class="p-4 space-y-1">
                        <h3 class="font-meduium text-base">{{ item.name }}</h3>
                        <p class="text-sm text-gray-500 line-clamp-2">{{ item.description }}</p>
                        <span class="text-xs text-gray-400 pt-2">
                            Ends {{ formatDate(item.end_date) }}
                        </span>
                    </div>
                </li>
            </ul>
        </section>
       
        <!-- Ended -->
        
        <section class="mb-14">
            <h2 class="text-lg font-medium mb-6">Auctions Ended</h2>

             <div
            v-if="user.auctions_ended.length === 0"
            class="text-gray-500"
            >
                No ended auctions
            </div>  

            <ul v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 opacity-60 grayscale">
                <li
                    v-for="item in user.auctions_ended"
                    :key="item.item_id"
                    @click="$router.push('/item/' + item.item_id)"
                    class="bg-white overflow-hidden cursor-pointer shadow-md transition hover:-translate-y-1"
"
                >
                    <img
                        :src="item?.image_url || placeholder"
                        class="w-full h-56 object-cover"
                    />
                    
                    <div class="p-4 space-y-1">
                        <h3 class="font-meduium text-base">{{ item.name }}</h3>
                        <p class="text-sm text-gray-500 line-clamp-2">{{ item.description }}</p>
                        <span class="text-xs text-gray-400 pt-2">
                            Ends {{ formatDate(item.end_date) }}
                        </span>
                    </div>
                </li>
            </ul>
        </section>

        <section id="drafts" class="mb-14">
            <h2 class="text-lg font-medium mb-6">Item Drafts</h2>

             <div
            v-if="drafts.length === 0"
            class="text-gray-500"
            >
                No drafts saved
            </div>  

            <ul v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 opacity-80">
                <li
                    v-for="draft in drafts"
                    :key="draft.id"
                    class="bg-white overflow-hidden cursor-pointer transition hover: shadow-md hover:-translate-y-1"
                >
                    <img
                        :src="draft.image_url || placeholder"
                        class="w-full h-56 object-cover opacity-70 grayscale"
                    />

                    <div class="p-4 space-y-2">
                        <h3 class="font-medium text-base">
                            {{ draft.name || "Untitled draft" }}
                        </h3>

                        <p class="text-sm text-gray-500 line-clamp-2">
                            {{ draft.description || "No descrpition yet" }}
                        </p>

                        <div class="flex gap-3 pt-2">
                            <button @click="editDraft(draft.id)" class="text-sm text-gray-500 underline hover:text-black transition">
                                Edit
                            </button>

                            <button @click="deleteDraft(draft.id)" class="text-sm text-red-400 underline hover:text-red-700 transition">
                                Delete
                            </button>
                        </div>
                    </div>
                </li>
            </ul>
        </section>
    </div>
</template>

<script>
import { coreService } from '@/services/core.service';
import { draftService } from '@/services/draft.service';

export default {
    data() {
        return {
            placeholder: "https://picsum.photos/600/400",
            drafts: [],
            user: {
                first_name: "",
                last_name: "",
                selling: [],
                bidding_on: [],
                auctions_ended: [],
            }
        }
    },
    mounted() {
        const userId = localStorage.getItem("user_id")
        this.loadProfile(userId)
        this.drafts = draftService.getDrafts()
    },
    methods: {
        editDraft(id) {
            this.$router.push({
                path: "/create",
                query: { draftId: id }
            })
        },
        deleteDraft(id) {
            draftService.deleteDraft(id)
            this.drafts = draftService.getDrafts()
        },  
        loadProfile(userId) {
            coreService.getUserProfile(userId)
                .then(async (data) => {
                    this.user = data

                    if(this.$route.hash === '#drafts') {
                        await this.$nextTick()
                        document.querySelector("#drafts")?.scrollIntoView({ behavior: "smooth" })
                    }
                })
                .catch(err => {
                    console.error("Failed to load profile", err)
                })
        },
        formatDate(timestamp) {
            const date = new Date(timestamp * 1000)
            return date.toLocaleDateString()
        }
    }
}
</script>