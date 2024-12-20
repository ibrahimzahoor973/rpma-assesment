<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <NuxtLink to="/" class="flex-shrink-0 flex items-center">
              <h1 class="text-xl font-bold text-gray-800">My Store</h1>
            </NuxtLink>
          </div>
          <div class="flex items-center">
            <button v-if="authStore.isAuthenticated" 
                    @click="authStore.logout"
                    class="text-gray-600 hover:text-gray-900">
              Logout
            </button>
            <NuxtLink v-else to="/login" 
                      class="text-gray-600 hover:text-gray-900">
              Login
            </NuxtLink>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <NuxtPage />
    </main>
  </div>
</template>

<script setup>
const authStore = useAuthStore()

// Initialize auth state on app load
onMounted(() => {
  authStore.initAuth()
})
</script>