<template>
    <footer class="border-t border-gray-100 bg-gray-50">
        <div class="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">

            <!-- Brand -->
            <div class="flex items-center gap-2">
                <span class="font-medium text-pink-700">
                    Artctioneer
                </span>
                <span class="text-pink-700">
                    @ {{ year }}
                </span>
            </div>

            <!-- Links -->
            <div class="flex items-center gap-6">
                <button
                    class="hover:text-black transition"
                    @click="$router.push('/')"
                >
                    Home
                </button>

                <template v-if="isLoggedIn">
                    <button
                        class="hover:text-black transition"
                        @click="$router.push('/create')"
                    >
                        Create
                    </button>
                    <button
                        class="hover:text-black transition"
                        @click="$router.push('/profile')"
                    >
                        Profile
                    </button>
                </template>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: "Footer",
    data() {
        return {
            authTick: 0
        }
    },
    computed: {
        isLoggedIn() {
            this.authTick
            return !!localStorage.getItem('session_token')
        },
        year() {
            return new Date().getFullYear()
        }
    },
    methods: {
        onAuthChange() {
            this.authTick++
        }
    },
    mounted() {
        window.addEventListener("auth-changed", this.onAuthChange)
    },
    beforeUnmount() {
        window.removeEventListener("auth-changed", this.onAuthChange)
    },
}
</script>