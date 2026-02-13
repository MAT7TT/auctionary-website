<template>
    <div class="max-w-md mx-auto px-6 py-16">

        <!-- Card -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
            
            <!-- Title -->
            <div>
                <h1 class="text-2xl font-semibold">
                    Welcome to Arctioneer
                </h1>
                <p class="text-sm text-gray-500">
                    Login or create an account
                </p>
            </div>
            
            <!-- Tabs -->
            <div class="flex rounded-lg bg-gray-100 p-1">
                <button
                    @click="activeTab = 'login'"
                    class="flex-1 py-2 text-sm rounded-md transition"
                    :class="activeTab === 'login' ? 'bg-white shadow text-black' : 'text-gray-600'"
                >
                    Login
                </button> 

                <button
                    @click="activeTab = 'register'"
                    class="flex-1 py-2 text-sm rounded-md transition"
                    :class="activeTab === 'register' ? 'bg-white shadow text-black' : 'text-gray-600'"
                >
                    Register
                </button> 
            </div>

            <!-- Forms -->
            <LoginForm
                v-if="activeTab === 'login'"
                @login-success="onLogin"
            />

            <RegisterForm
                v-if="activeTab === 'register'"
                @register-success="onRegister"
            />
        </div>
    </div>
</template> 

<script>
import LoginForm from '../components/auth/LoginForm.vue'
import RegisterForm from '../components/auth/RegisterForm.vue'

export default {
    components: { LoginForm, RegisterForm },

    data() {
        return {
            activeTab: 'login'
        }
    },
    methods: {
        onLogin() {
            this.$router.push('/')
        },
        onRegister() {
            this.activeTab = 'login'
        }
    }
}
</script>