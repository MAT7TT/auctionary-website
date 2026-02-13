<template>
    <div class="max-w-6xl mx-auto px-6 py-10 space-y-6">
        
        <p v-if="loading" class="text-sm text-gray-500">
            Loading item...
        </p>

        <p v-if="error" class="text-sm text-red-600">
            {{ error }}
        </p>

        <div v-if="!loading && !error" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            <!-- Main -->
            <div class="lg:col-span-2 space-y-6">
                <ItemOverview
                    :item="item"
                    :currentBid="currentBid"
                    :isOwner="isOwner"
                    :timeRemaining="timeRemaining"
                    :formattedEndDate="formattedEndDate"
                />
                <ItemQuestions
                    :item="item"
                    :questions="questions"
                    :isOwner="isOwner"
                    @refresh="loadQuestions"
                />
            </div>

            <!-- Sidebar -->
             <div>
                <ItemBidding
                    :item="item"
                    :currentBid="currentBid"
                    :bidHistory="bidHistory"
                    :isOwner="isOwner"
                    @bid-placed="loadBids"
                />
             </div>
        </div>
    </div>
</template>

<script>
import { coreService } from '../../services/core.service'
import { questionService } from '@/services/question.service';

import ItemOverview from '../components/items/ItemOverview.vue';
import ItemBidding from '../components/items/ItemBidding.vue';
import ItemQuestions from '../components/items/ItemQuestions.vue';

export default {
    components: {
        ItemOverview,
        ItemBidding,
        ItemQuestions
    },
    data() {
        return {
            item: {},
            bidHistory: [],
            questions: [],
            currentBid: null,
            loading: false,
            error: ""
        }
    },
    mounted() {
        this.loadItem()
    },
    computed: {
        isOwner() {
            const userId = localStorage.getItem("user_id")
            return userId && Number(userId) === this.item.creator_id
        },
        formattedEndDate() {
            if (!this.item.end_date) return "Unknown"
            return new Date(this.item.end_date * 1000).toLocaleString()
        },
        timeRemaining() {
            if (!this.item.end_date) return ""

            const diff = this.item.end_date * 1000 - Date.now()
            if (diff <= 0) return "Auction ended"

            let totalSeconds = Math.floor(diff / 1000)

            const days = Math.floor(totalSeconds / 86400)
            totalSeconds %= 86400

            const hours = Math.floor(totalSeconds / 3600)
            totalSeconds %= 3600

            const mins = Math.floor(totalSeconds / 60)
            const secs = totalSeconds % 60

            if (days > 0) {
                return `${days}d ${hours}h ${mins}m ${secs}s remaining`
            }
            if (hours > 0) {
                return `${hours}h ${mins}m ${secs}s remaining`
            }
            if (mins > 0) {
                return `${mins}m ${secs}s remaining`
            }
            return `${secs}s remaing`
        }
    },
    methods: {
        loadItem() {
            this.loading = true
            const id = this.$route.params.id

            coreService.getSingleItem(id)
            .then(item => {
                this.item = item
                return Promise.all([
                    this.loadBids(),
                    this.loadQuestions()
                ])
            })
            .catch(err => {
                this.error = "Failed to load item"
                console.error("load item error: ", err)
            })
            .finally(() => this.loading = false)
        },
        loadBids() {
            return coreService.getBidHistory(this.item.item_id)
            .then(bids => {
                this.bidHistory = bids
                this.currentBid = bids.length ? bids[0].amount : null
            })
        },
        loadQuestions() {
            return questionService.getItemQuestions(this.item.item_id)
            .then(qs => this.questions = qs)
        }
    }
}
</script>