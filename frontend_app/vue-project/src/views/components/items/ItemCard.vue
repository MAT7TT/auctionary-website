<template>
    <div 
        @click="$emit('click')"
        class="cursor-pointer overflow-hidden bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
        
    >
    
        <img
            :src="item.image_url || placeholder"
            alt="Artwork image"
            class="h-56 w-full object-cover"
        />

        <div class="p-4">
            <h3 class="text-lg font-semibold text-gray-900">
                {{ item.name }}</h3>

            <p class="mt-1 line-clamp-2 text-sm text-gray-600">
                {{ item.description }}
            </p>

            <p class="mt-3 text-xs text-gray-500">
                Ends: {{ formattedEndDate }}
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ItemCard',

        data() {
            return {
                placeholder: "https://picsum.photos/600/400"
            }
        },
        props: {
            item: {
                type: Object,
                required: true
            }
        },
        computed: {
            formattedEndDate() {
                const date = new Date(this.item.end_date * 1000)
                return date.toLocaleDateString()
            }
        }
    }
</script>
