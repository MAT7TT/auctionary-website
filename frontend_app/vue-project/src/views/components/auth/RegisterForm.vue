<template>
    <form @submit.prevent="handleSubmit" class="space-y-4">

        <!-- First Name -->
        <div>
            <label class="block text-sm font-medium mb-1">First name</label>
            <input 
                type="text"
                v-model="first_name"
                class="w-full border rounded-mb px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
            <div v-show="submitted && !first_name" class="text-sm text-red-600 mt-1">
                First name is required 
            </div>
        </div>
        
        <!-- Last Name -->
        <div>
            <label class="block text-sm font-medium mb-1">Last name</label>
            <input 
                type="text"
                v-model="last_name"
                class="w-full border rounded-mb px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
            <div v-show="submitted && !last_name" class="text-sm text-red-600 mt-1">
                last name is required 
            </div>
        </div>

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

        <!-- Password-->
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
            Create Account
        </button>
    </form>
</template> 

<script>
import { authService } from "../../../services/auth.service"

export default {
    data() {
        return {
            first_name: "",
            last_name: "",
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

            if (!(this.first_name && this.last_name && this.email && this.password)) {
                return
            }

            const user = {
                first_name: this.first_name,
                last_name: this.last_name,
                email: this.email,
                password: this.password
            }

            authService
                .register(user)
                .then(() => {
                    this.$emit("register-success")
                    localStorage.setItem("first_name", this.first_name);
                    localStorage.setItem("last_name", this.last_name);

                })
                .catch((err) => {
                    this.error = err
                })
        }
    }
}
</script>