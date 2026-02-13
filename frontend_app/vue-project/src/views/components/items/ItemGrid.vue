<template>
    <div class="
            grid gap-8
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
            "
        >
        <ItemCard
            v-for="item in items"
            :key="item.item_id"
            :item="item"
            @click="$emit('select', item.item_id)"
        />
    </div>
</template>

<script>
import ItemCard from "../../components/items/ItemCard.vue"

export default {
    props: {
        items:  {
            type: Array,
            required: true
        }
    },
    components: { ItemCard }
}
</script>