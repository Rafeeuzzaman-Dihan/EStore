<template>
  <div class="card text-center flex flex-col items-center relative">
    <NuxtLink :to="`/products/${product.id}`">
      <img :src="product.image" class="thumb" alt="Product Image" />
    </NuxtLink>
      <span 
        class="material-icons heart-icon" 
        @click="toggleFav"
        :class="{ 'filled': isFav }"
      >
        favorite
      </span>
    <NuxtLink :to="`/products/${product.id}`">
      <p class="font-bold text-gray-800 mt-2">{{ product.title }}</p>
    </NuxtLink>
    <div class="rating">
      <span class="text-gray-800 font-semibold">
        <span v-for="star in 5" :key="star" class="star" :class="{ filled: star <= product.rating.rate }">★</span>
      </span>
      <span class="text-gray-500"> ({{ product.rating.count }} reviews)</span>
    </div>

    <p class="price">${{ product.price }}</p>
    <div class="flex gap-3">
      <button class="btn mt-4" @click="addToCart">Add to Cart</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { showToast } from '@/composables/toast';
import { useCart } from '@/composables/state'; 

const { product } = defineProps(['product']);
const cart = useCart();
const isFav = ref(false); // Reactive variable to track favorite status

// Check if the product is in favorites on mount
onMounted(() => {
  const fav = JSON.parse(localStorage.getItem('fav')) || [];
  isFav.value = fav.some(item => item.id === product.id); // Set isFav based on local storage
});

const addToCart = () => {
  if (typeof window !== 'undefined') {
    const cartItem = {
      image: product.image,
      price: product.price,
      description: product.description,
      title: product.title,
      id: product.id,
      quantity: 1,
    };

    const currentCart = cart.value;

    // Checking if the product is already in the cart
    const productExists = currentCart.some(item => item.id === cartItem.id);

    if (productExists) {
      showToast('warning', `${product.title} already in the cart`);
      return;
    }

    // Add the new item to the cart
    currentCart.push(cartItem);

    // Update the reactive state
    cart.value = currentCart;

    // Save the updated cart back to local storage
    localStorage.setItem('cart', JSON.stringify(currentCart));

    // Notify the user
    showToast('success', `${product.title} added in the cart`);
  }
};

const toggleFav = () => {
  if (typeof window !== 'undefined') {
    const favItem = {
      image: product.image,
      price: product.price,
      description: product.description,
      title: product.title,
      id: product.id,
    };

    // Retrieve existing favourite items from local storage
    const fav = JSON.parse(localStorage.getItem('fav')) || [];

    // Checking if the product is already in the favourites
    const productExists = fav.some(item => item.id === favItem.id);

    if (productExists) {
      // Remove from favorites
      const updatedFav = fav.filter(item => item.id !== favItem.id);
      localStorage.setItem('fav', JSON.stringify(updatedFav));
      showToast('info', `${product.title} removed from favourites`);
      isFav.value = false; // Update favorite status
    } else {
      // Add to favorites
      fav.push(favItem);
      localStorage.setItem('fav', JSON.stringify(fav));
      showToast('success', `${product.title} added to favourites`);
      isFav.value = true; // Update favorite status
    }
  }
};
</script>

<style scoped>
.thumb {
  max-height: 200px;
  max-width: 100%;
  margin: 0 auto;
  border-radius: 10px; /* Rounded image corners */
  transition: transform 0.3s; /* Transition effect */
}

.card:hover .thumb {
  transform: scale(1.05); /* Scale effect on hover */
}

.card:hover {
  @apply transform scale-105;
}

.rating {
  margin: 10px 0;
  font-size: 1rem;
}

.star {
  font-size: 1.5rem; /* Adjust size as needed */
  color: gray; /* Default star color */
}

.star.filled {
  color: gold; /* Color for filled stars */
}

.price {
  font-size: 1.5rem;
  color: #333;
  font-weight: bold;
}

.heart-icon {
  position: absolute;
  top: 10px; /* Adjust position as needed */
  right: 10px; /* Adjust position as needed */
  font-size: 24px; /* Adjust size as needed */
  color: gray; /* Default heart color */
  cursor: pointer; /* Pointer cursor on hover */
  transition: color 0.3s; /* Transition effect */
}

.heart-icon.filled {
  color: red; /* Color when filled */
}
</style>