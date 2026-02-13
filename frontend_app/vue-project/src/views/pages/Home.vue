<template>
  <div class="max-w-7xl mx-auto px-6 py-10 space-y-8">
    
    <!-- Heading -->
    <div>
      <h1 class="text-2xl font-semibold text-gray-500">Discover Artworks</h1>
      <p class="text-sm text-gray-500">Browse and bid on unique pieces</p>
    </div>

    <!-- Filters -->
    <div class="space-y-4">
      <StatusFilter 
        :statuses="statuses"
        :selected="selectedStatus"
        :disabled="!isLoggedIn"
        @change="setStatus"
      />

      <SearchBar
        v-model="searchQuery"
        @search="triggerSearch"
      />

      <CategoryFilter 
        :categories="categories"
        v-model="selectedCategories"
      />
    </div>
  
    <!-- States -->

    <div v-if="loading" class="text-sm text-gray-500">
      Loading artworks...
    </div>

    <div v-if="error" class="text-sm text-red-600">
      {{ error }}
    </div>

    <!-- Results -->
    <ItemGrid
      v-if="!loading"
      :items="items"
      @select="goToItem"
    />

    <!-- Pagination -->
    <div class="flex gap-4 pt-6">
      <button 
        @click="prevPage" 
        :disabled="offset === 0"
        class="px-4 py-2 rounded-md bg-pink-100 text-sm hover:bg-pink-300 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        Previous
      </button>

      <button 
        @click="nextPage"
        :disabled="!hasNextPage"
        class="px-4 py-2 rounded-md bg-pink-100 text-sm hover:bg-pink-300 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
import { coreService } from '../../services/core.service'
import { categoryService } from '../../services/categories.service'

// filters
import SearchBar from '@/views/components/filters/SearchBar.vue'
import StatusFilter from '@/views/components/filters/StatusFilter.vue'
import CategoryFilter from '@/views/components/filters/CategoryFilter.vue'

// items
import ItemGrid from '../components/items/ItemGrid.vue'

export default {
  name: 'Home',
  
  components: {
    SearchBar,
    StatusFilter,
    CategoryFilter,
    ItemGrid
  },
  data() {
    return {
      searchQuery: '',
      selectedStatus: '',
      selectedCategories: [],

      items: [],
      categories: [],

      limit: 9,
      offset: 0,

      loading: false,
      error: '',

      hasNextPage: true,

      statuses: [
        { label: 'All', value: '' },
        { label: 'My Active Listings', value: 'OPEN' },
        { label: 'My Bids', value: 'BID' },
        { label: 'My Ended Listings', value: 'ARCHIVE' }
      ]
    }
  },
  watch: {
    selectedCategories() {
      this.offset = 0
      this.searchItems()
    }
  },
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem('session_token')
    }
  },
  mounted() {
    this.loadCategories()
    this.searchItems()
  },
  methods: {
    setStatus(status) {
      this.selectedStatus = status
      this.offset = 0
      this.searchItems()
    },
    
    loadCategories() {
      categoryService.getCategories()
      .then(rows => {
        this.categories = rows
      })
      .catch(() => {
        console.warn('Failed to load categories')
      })
    },

    triggerSearch() {
      this.offset = 0
      this.searchItems()
    },

    searchItems() {
      this.loading = true
      this.error = ''

      coreService.searchItems(
        this.searchQuery,
        this.selectedStatus,
        this.selectedCategories,
        this.limit,
        this.offset
      )
      .then(items => {
        this.items = items
        this.hasNextPage = items.length === this.limit

        if (items.length === 0) {
          this.error = 'No artworks found'
        }
      })
      .catch(() => {
        this.items = []
        this.hasNextPage = false
        this.error = 'Failed to load artworks'
      })
      .finally(() => {
        this.loading = false
      })
    },

    nextPage() {
      this.offset += this.limit
      this.searchItems()
    },

    prevPage() {
      if (this.offset >= this.limit) {
        this.offset -= this.limit
        this.searchItems()
      }
    },

    goToItem(itemId) {
      this.$router.push(`/item/${itemId}`)
    }
  }
}
</script>