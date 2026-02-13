<template>
    <div class="flex gap-2 flex-wrap">
        <button
            v-for="s in statuses"
            :key="s.value"
            :disabled="disabled && s.value !== ''"
            @click="$emit('change', s.value)"
            class="px-4 py-1.5 rounded-full text-sm transition disabled:opacity-50"
            :class="selected === s.value ? 'bg-black text-white' : 'bg-pink-100 text-gray-700 hover:bg-pink-200'"
        >
        {{ s.label }}
        </button>
    </div>
</template>

<script>
export default {
    props: {
        statuses: Array,
        selected: String,
        disabled: Boolean
    }
}
</script>