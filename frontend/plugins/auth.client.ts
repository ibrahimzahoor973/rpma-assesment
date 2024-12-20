export default defineNuxtPlugin(async () => {
  const authStore = useAuthStore()
  // Initialize auth state
  if (process.client) {
    authStore.initAuth()
  }
})