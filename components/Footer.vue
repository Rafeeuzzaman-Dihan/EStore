<template>
    <div>
        <footer class="bg-gray-100 text-center py-4 mt-8">
    <p class="text-gray-600">© 2025 Nuxt Store. All rights reserved.</p>
    <div class="flex justify-center space-x-4">
            <div v-for="item in footItems" :key="item.name">
              <NuxtLink :to="item.link" class="nav-link">
                {{ item.name }}
              </NuxtLink>
            </div>
          </div>
  </footer>
    </div>
</template>

<script setup>

const footItems = [
    { name: 'Home', link: "/" },
    { name: 'About', link: "/about" },
    { name: 'Cart', link: "/cart" },
];

</script>

<style scoped>
  
  </style>