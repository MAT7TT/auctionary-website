<template>
    <input
        class="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
        type="text"
        placeholder="Search artworks..."
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        @keyup.enter="$emit('search')"
    />
</template>

<script>
    export default {
        props: {
            modelValue: String
        }
    }
</script>