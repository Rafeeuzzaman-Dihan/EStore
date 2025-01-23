<template>
  <div>
    <header class="shadow-lg bg-white dark:bg-gray-800">
      <nav class="container mx-auto flex justify-between items-center p-4">
        <NuxtLink class="logo" to="/">
          <img src="/assets/logo.png" alt="Logo" class="logo-image" />
        </NuxtLink>
        <div class="flex items-center space-x-4">
          <div v-for="item in navItems" :key="item.name">
            <NuxtLink :to="item.link" class="nav-link flex items-center">
              <span class="material-icons">{{ item.icon }}</span>
              {{ item.name }}
              <span v-if="item.value" class="cart-value">{{ item.value }}</span>
            </NuxtLink>
          </div>
          <button @click="toggleDarkMode" class="flex items-center p-2 rounded-md bg-gray-200 dark:bg-gray-700 transition duration-300">
            <span class="material-icons">{{ isDarkMode ? 'light_mode' : 'dark_mode' }}</span>
          </button>
        </div>
      </nav>
    </header>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useCart } from '@/composables/state.js'; 

const cart = useCart();
const isDarkMode = ref(false);

// Toggle dark mode
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  if (isDarkMode.value) {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }
};

const navItems = computed(() => [
  { link: "/", icon: 'home' }, 
  { link: "/favourite", icon: 'favorite' }, 
  { link: "/cart", icon: 'shopping_cart', value: cart.value.length },
]);
</script>

<style scoped>
.header {
  background-color: #ffffff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.logo-image {
  max-height: 50px; 
}
.nav-link {
  text-decoration: none;
  color: #333;
  padding: 10px 15px;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;
}
.nav-link:hover {
  background-color: #f0f0f0;
  color: #007BFF; 
}
.container {
  max-width: 1200px;
  margin: 0 auto;
}
.flex {
  display: flex;
}
.space-x-4 > * + * {
  margin-left: 1rem; 
}
.items-center {
  align-items: center;
}
.p-4 {
  padding: 1rem; 
}
.cart-value {
  margin-left: 5px; 
  background-color: #007BFF; 
  color: white; 
  border-radius: 12px; 
  padding: 2px 5px; 
  font-size: 12px;
}
</style>