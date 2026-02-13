<template>
  <div class="min-h-screen flex flex-col bg-gray">
    <HeaderNav />

    <main class="flex-1">
      <router-view />
    </main>

    <Footer />
  </div>
</template>

<script>
import HeaderNav from './components/layout/HeaderNav.vue'
import Footer from './components/layout/Footer.vue'

export default { components: { HeaderNav , Footer }}
</script>

<style>
</style>
