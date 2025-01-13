<template>
  <div class="card">
    <div class="grid grid-cols-2 gap-10">
      <div class="p-7">
        <img :src="`${product.image}`" class="mx-auto my-7" />
      </div>
      <div class="p-7">
        <h2 class="text-4xl my-7">{{ product.title }}</h2>
        <p class="text-xl my-7">Price - ${{ product.price }}</p>
        <p class="text-xl my-7">Rating - {{ product.rating.rate }} ({{ product.rating.count }} reviews)</p>
        <h3 class="font-bold border-b-2 mb-4 pb-2">Product description:</h3>
        <p class="mb-7">{{ product.description }}</p>
        <button class="btn mt-4">Add to Cart</button>
      </div>
    </div>
  </div>
</template>

<script setup>
  const { product } = defineProps(['product']);
</script>

<style scoped>
  img {
    max-width: 400px;
  }
</style>