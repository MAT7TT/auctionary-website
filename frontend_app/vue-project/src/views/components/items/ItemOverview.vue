<template>
    <div class="bg-white rounded-xl shadow-sm shadow-sm border border-gray-200 overflow-hidden">

        <img 
            :src="item.image_url || placeholder"
            class="w-full h-72 object-cover"
        />
        
        <div class="p-6 space-y-4">
            <div>
                <h1 class="text-2xl font-semibold">{{ item.name }}</h1>
                <p class="text-gray-600">{{ item.description }}</p>
            </div>

            <div class="flex flex-wrap gap-2">
                <span 
                    v-for="cat in item.categories"
                    :key="cat.category_id"
                    class="px-3 py-1 text-xs text-white rounded-full bg-pink-500"
                >
                    {{ cat.name }}
                </span>
            </div>

            <div class="text-sm text-gray-600 space-y-1">
                <p><strong>Status:</strong> {{ timeRemaining }}</p>
                <p><strong>Starting Bid:</strong> {{ '£' + item.starting_bid }}</p>
                <p><strong>Current Bid:</strong> {{ currentBid ? '£' + currentBid : 'No bids yet' }}</p>
                <p><strong>Ends:</strong> {{ formattedEndDate }}</p>
                <p><strong>Creator:</strong> {{ item.first_name }} {{ item.last_name }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        item: Object,
        currentBid: Number,
        timeRemaining: String,
        formattedEndDate: String
    },
    data() {
        return {
            placeholder: "https://picsum.photos/600/400"
        }
    }
}
</script>