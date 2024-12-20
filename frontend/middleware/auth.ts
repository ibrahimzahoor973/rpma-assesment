export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore()

  // Initialize authentication state
  if (process.client) {
    await authStore.initAuth()
  }

  // Skip middleware if we're already on the login page
  if (to.path === '/login') {
    return
  }

  // Check if user is authenticated
  if (!authStore.isAuthenticated) {
    return navigateTo('/login')
  }
})