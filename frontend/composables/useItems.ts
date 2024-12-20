import { defineStore } from 'pinia'

export const useItemsStore = defineStore('items', {
  state: () => ({
    items: [] as any[],
    currentItem: null as any
  }),

  actions: {
    async fetchItems() {
      try {
        const authStore = useAuthStore()
        const response = await fetch(`${useRuntimeConfig().public.apiBase}/items`, {
          headers: {
            'Authorization': `Bearer ${authStore.token}`
          }
        })

        if (!response.ok) throw new Error('Failed to fetch items')

        this.items = await response.json()
      } catch (error) {
        console.error('Error fetching items:', error)
      }
    },

    async fetchItemById(id: string) {
      try {
        const authStore = useAuthStore()
        const response = await fetch(`${useRuntimeConfig().public.apiBase}/items/${id}`, {
          headers: {
            'Authorization': `Bearer ${authStore.token}`
          }
        })

        if (!response.ok) throw new Error('Failed to fetch item')

        this.currentItem = await response.json()
      } catch (error) {
        console.error('Error fetching item:', error)
      }
    }
  }
})