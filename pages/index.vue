<template>
  <div class="container mx-auto p-6">
    <div class="flex flex-col md:flex-row items-center bg-blue-50 p-10">
      <div class="text-section md:w-1/2">
        <h1 class="text-6xl font-bold mb-4 text-green-600">EStore</h1>
        <h3 class="text-3xl mb-7 leading-tight">
          Discover Your <br />
          Next Favourite Find!
        </h3>
        <p class="text-xl mb-4">Explore a world of unique products, handpicked just for you.</p>
      </div>
      <div class="image-section md:w-1/2">
        <img src="/assets/home.jpg" alt="EStore" class="w-full h-auto rounded-lg shadow-lg" />
      </div>
    </div>

    <div v-if="loading" class="text-center text-xl mt-4">
      Loading products...
    </div>

    <div v-if="!loading && products.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
      <div
        v-for="p in products"
        :key="p.id" 
      >
        <ProductCard :product="p" />
      </div>
    </div>

    <div v-if="!loading && !products.length" class="text-center text-xl mt-4">
      No products available.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ProductCard from '@/components/ProductCard.vue'; 

const loading = ref(true);
const products = ref([]);

onMounted(async () => {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    products.value = await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.text-section {
  padding: 20px;
}

.image-section img {
  max-width: 100%;
  height: auto;
}

@media (min-width: 768px) {
  .image-section {
    text-align: center;
  }
}

.bg-gray-100 {
  background-color: #f7fafc; 
}

.text-section h1 {
  font-size: 6rem; 
}

.text-section h3 {
  font-size: 3rem; 
}

.text-section p {
  font-size: 1.25rem; 
}
</style>