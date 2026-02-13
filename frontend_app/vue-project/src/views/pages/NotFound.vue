<template>
  <div class="max-w-xl mx-auto px-6 py-20 text-center">
    <h1 class="text-4xl font-semibold mb-4">404</h1>
    <p class="text-gray-500 mb-6">
      The page you are looking for does not exist.
    </p>
  </div>
  
  <router-link 
    to="/"
    class="block mx-auto bg-black text-white px-4 py-2 rounded:bg-gray-800 w-fit"
    >
      Go back home
    </router-link>
</template>

<script>
export default {
  name: "NotFound"
}
</script> 
