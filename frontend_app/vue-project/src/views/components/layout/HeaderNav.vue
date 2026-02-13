<template>
  <header class="sticky top-0 z-50 bg-gray-50 border-b border-gray-100">
    <nav class="max-w-7x1 mx-auto px-6 h-16 flex items-center justify-between">
      
      
      <h1 class ="text-3xl text-pink-700 font-bold tracking-tight cursor-pointer hover:text-pink-400" @click="$router.push('/')"
        >Artctioneer
      </h1>

      <!-- Desktop Nav -->
      <div class="hidden md:flex items-center gap-6 text-sm">
        <button class="text-lg flex items-center gap-6" @click="$router.push('/')"
          >Home
      </button>
        
        <!-- Logged Out -->
        <template v-if="!isLoggedIn">
          <button class="text-lg text-gray-700 hover:text-black transition" @click="$router.push('/auth')"
            >Login</button>
        </template>

        <!-- Logged In-->
        <template v-else>
            <button class="text-lg text-gray-700 hover:text-black transition" @click="$router.push('/create')"
              >Create Item
            </button>
            <button class="text-lg text-gray-700 hover:text-black transition" @click="$router.push('/profile')"
              >Profile
            </button>
            <button class="text-lg text-red-600 hover:text-red-700 transition font-medium" @click="logoutUser"
              >Logout
            </button>
        </template>
      </div>

      <!-- Mobile Button -->
      <button 
        class="md:hidden text-2xl"
        @click="mobileOpen = !mobileOpen"
      >
        ☰
      </button>
    </nav>

    <!-- Mobile Menu -->
    <div
      v-if="mobileOpen"
      class="md:hidden border-t border-gray-200 bg-white px-6 py-4 space-y-3 text-sm"
    >
      <button class="block w-full text-left" @click="go('/')">Home</button>

      <template v-if="!isLoggedIn">
        <button class="block w-full text-left" @click="go('/auth')">Login</button>
      </template>

      <template v-else>
        <button class="block w-full text-left" @click="go('/create')">Create Item</button>
        <button class="block w-full text-left" @click="go('/profile')">Profile</button>
        <button class="block w-full text-left text-red-600" @click="logoutUser">Logout</button>
      </template>
    </div>
  </header>
</template>

<script>
import { authService } from '@/services/auth.service';

export default {
  data() {
    return {
      authTick: 0,
      mobileOpen: false
    }
  },
  computed: {
    isLoggedIn() {
      this.authTick
      return localStorage.getItem("session_token") !== null;
    }
  },
  methods: {
    logoutUser() {
      authService.logout()
      .finally(() => {
        localStorage.removeItem("session_token")
        localStorage.removeItem("user_id")
        this.authTick++
        this.mobileOpen = false
        this.$router.push("/")
      })
    },
    go(path) {
      this.mobileOpen = false
      this.$router.push(path)
    },
    onAuthChange() {
      this.authTick++
    }
  },
  mounted() {
    window.addEventListener("auth-changed", this.onAuthChange)
  },
  beforeUnmount() {
    window.removeEventListener("auth-changed", this.onAuthChange)
  }
}
</script>
