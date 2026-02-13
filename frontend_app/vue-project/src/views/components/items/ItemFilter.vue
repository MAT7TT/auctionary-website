<template>
    <div>
        <input
            class="search-input"
            placeholder="Search artworks..."
            v-model="localQuery"
            @input="emitSearch"
        />

        <div class="status-fitlers">
            <button
                v-for="s in statuses"
                :key="s.value"
                :disabled="s.requiresAuth && !isLoggedIn"
                @click="$emit('update:status', s.value)"
                :class="{ active: selectedStatus === s.value }"
            >
                {{ s.label }}
            </button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        selectedStatus: String,
        isLoggedIn: Boolean
    },
    data() {
        return {
            localQuery: "",
            statuses: [
                { label: "All", value: "", requiresAuth: false },
                { label: "Open", value: "OPEN", requiresAuth: false },
                { label: "My bids", value: "BID", requiresAuth: false },
                { label: "Archived", value: "ARCHIVE", requiresAuth: false }
            ]
        }
    },
    methods: {
        emitSearch() {
            this.$emit("update:query", this.localQuery)
        }
    }
}
</script>