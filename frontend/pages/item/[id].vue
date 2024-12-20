<template>
  <div v-if="itemsStore.currentItem" class="bg-white rounded-lg shadow-md p-6">
    <h2 class="text-3xl font-bold text-gray-900 mb-4">{{ itemsStore.currentItem.name }}</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <img v-if="itemsStore.currentItem.image" 
             :src="itemsStore.currentItem.image" 
             :alt="itemsStore.currentItem.name"
             class="w-full rounded-lg">
      </div>
      <div>
        <p class="text-xl text-gray-600 mb-4">{{ itemsStore.currentItem.description }}</p>
        <p class="text-2xl font-bold text-gray-900 mb-4">${{ itemsStore.currentItem.price }}</p>
        <div class="space-y-4">
          <h3 class="text-lg font-semibold">Details:</h3>
          <ul class="list-disc list-inside space-y-2">
            <li v-for="(value, key) in itemsStore.currentItem.details" 
                :key="key"
                class="text-gray-600">
              {{ key }}: {{ value }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="text-center py-12">
    <p class="text-gray-600">Loading...</p>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ['auth']
})

const route = useRoute()
const itemsStore = useItemsStore()

// Fetch item details on page load
onMounted(async () => {
  await itemsStore.fetchItemById(route.params.id)
})
</script>