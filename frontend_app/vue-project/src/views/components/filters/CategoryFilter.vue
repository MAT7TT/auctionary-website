<template>
    <div v-if="categories.length" class="flex flex-wrap gap-3">
        <label v-for="cat in categories" :key="cat.category_id" class="cursor-pointer">
            <input 
                type="checkbox"
                :value="cat.category_id"
                v-model="localValue"
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
</template>

<script>
export default {
    props: {
        categories: Array,
       modelValue: Array
    },
    computed: {
        localValue: {
            get() {
                return this.modelValue
            },
            set(val) {
                this.$emit('update:modelValue', val)
                this.$emit('change')
            }
        }
    }
}
</script>