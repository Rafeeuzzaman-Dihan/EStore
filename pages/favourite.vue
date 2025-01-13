<template>
  <div class="container mx-auto p-6">
    <h1 class="text-4xl font-bold mb-8 text-center">Your Favourites</h1>
    <div v-if="favItems.length > 0" class="space-y-6">
      <div
        v-for="(item, index) in favItems"
        :key="index"
        class="flex items-center p-4 border rounded=lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300"   
      >

        <img :src="item.image" alt="Product Image" class="w-32 h-32 mr-6 rounded-md" />
        <div class="flex-1">
          <h2 class="text-xl font-semibold">{{ item.title }}</h2>
          <p class="text-lg font-bold text-gray-800">Price: ${{ item.price }}</p>
          <p class="text-sm text-gray-600">Description: {{ item.description }}</p>
        </div>
        <button
          @click="removeFromFav(index)"
          class="ml-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
        >
        Remove
        </button>
      </div>

    </div>
    <div v-else class="text-center text-gray-500 text-lg">No items in favourite</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const favItems = ref([]);

//Load favourite items from local storage
const loadFavItems = () => {
  if (typeof window !== 'undefined') {
    const items = JSON.parse(localStorage.getItem('fav')) || [];
    favItems.value = items;
    }
};

// Update fav items in local storage
const updateFav = () => {
  localStorage.setItem('fav', JSON.stringify(favItems.value));
};

// Remove item from favourite
const removeFromFav = (index) => {
  if (typeof window !== 'undefined') {
    const updatedFav = favItems.value.filter((_, i) => i !== index);
    localStorage.setItem('fav', JSON.stringify(updatedFav));
    favItems.value = updatedFav; 
  }
};

onMounted(loadFavItems)

</script>

<style scoped>
  img {
  max-width: 100px;
}

button {
  cursor: pointer;
}
</style>