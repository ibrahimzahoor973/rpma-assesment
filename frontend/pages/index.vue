<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">Available Items</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="item in itemsStore.items" 
           :key="item.id" 
           class="bg-white rounded-lg shadow-md overflow-hidden">
        <NuxtLink :to="`/item/${item._id}`">
          <div class="p-6">
            <h3 class="text-lg font-semibold text-gray-900">{{ item.name }}</h3>
            <p class="mt-2 text-gray-600">{{ item.description }}</p>
            <p class="mt-2 text-lg font-bold text-gray-900">${{ item.price }}</p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ['auth']
})

const itemsStore = useItemsStore()

// Fetch items on page load
onMounted(async () => {
  await itemsStore.fetchItems()
})
</script>