<template>
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5 space-y-4">
        
        <h3 class="font-semibold text-lg">Place a bid</h3>

        <input 
            type="number"
            v-model="bidAmount"
            :disabled="isOwner || !isLoggedIn || isEnded"
            class="w-full border rounded-md px-3 py-2"
        />

        <button @click="submitBid" 
                :disabled="isOwner || !isLoggedIn || isEnded"
                class="w-full bg-black text-white py-2 rounded-md hover:bg-pink-500 disabled:opacity-70"
        >
            Submit Bid
        </button>

        <p v-if="!isLoggedIn" class="text-sm text-red-500">
            Log in to place a bid
        </p>

        <p v-if="isOwner" class="text-sm text-red-500">
            You cannot bid on your own item
        </p>

         <p v-if="isEnded" class="text-sm text-red-500">
            This auction has ended
        </p>

        <p v-if="error" class="text-sm text-red-600">
            {{ error }}
        </p>

        <div v-if="bidHistory.length">
            <h4 class="font-medium mt-4">Bid History</h4>
            <ul class="text-sm text-gray-600 space-y-1">
                <li v-for="b in bidHistory" :key="b.timestamp">
                    £{{ b.amount }} - {{ b.first_name }} {{ b.last_name }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { coreService } from '@/services/core.service';

export default {
    props: {
        item: Object,
        currentBid: Number,
        bidHistory: Array,
        isOwner: Boolean
    },
    data() {
        return {
            bidAmount: "",
            error: ""
        }
    },
    computed: {
        isLoggedIn() {
            return !!localStorage.getItem("session_token")
        },
        isEnded() {
            const now = Math.floor(Date.now() / 1000)
            return this.item.end_date <= now
        }
    },
    methods: {
        submitBid() {
            const bid = Number(this.bidAmount)
            const min =  this.currentBid ?? this.item.starting_bid

            if (!bid || bid <= min) {
                this.error = `Bid must be higher than £${min}`
                return
            }

            coreService.placeBid(this.item.item_id, bid)
                .then(() => {
                    this.bidAmount = ""
                    this.error = ""
                    this.$emit("bid-placed")
                })
                .catch(err => this.error = err)
        }
    }
      
}
</script>