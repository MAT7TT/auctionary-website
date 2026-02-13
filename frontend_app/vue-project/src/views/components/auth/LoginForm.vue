<template>
    <form @submit.prevent="handleSubmit" class="space-y-4">

        <!-- Email -->
        <div>
            <label class="block text-sm font-medium mb-1">Email</label>
            <input 
                type="text"
                v-model="email"
                class="w-full border rounded-mb px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
            <div v-show="submitted && !email" class="text-sm text-red-600 mt-1">
                Email is required 
            </div>
        </div>

        <!-- Password -->
        
        <div>
            <label class="block text-sm font-medium mb-1">Password</label>
            <input 
                type="password"
                v-model="password"
                class="w-full border rounded-mb px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
            <div v-show="submitted && !password" class="text-sm text-red-600 mt-1">
                Password is required 
            </div>
        </div>

        <!-- Error -->
        <div v-if="error" class="text-sm text-red-600">
            {{ error }}
        </div>

        <!-- Submit -->
        <button 
            type="submit"
            class="w-full bg-black text-white py-2 rounded-md hover:bg-pink-500 transition"
        >
            Login
        </button>
    </form>
</template>

<script>
import { authService } from "../../../services/auth.service"

export default {
    data() {
        return {
            email: "",
            password: "",
            showPassword: false,
            submitted: false, 
            error: ""
        }
    },
    methods: {
        handleSubmit() {
            this.submitted = true
            this.error = ""

            const { email, password } = this

            if (!(email && password)) {
                return
            }

            authService
                .login(email, password)
                .then(() => {
                    this.$emit("login-success")
                })
                .catch((err) => {
                    this.error = err
                })
        }
    }
}
</script>