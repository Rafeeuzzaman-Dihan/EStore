<template>
  <div class="container mx-auto p-6">
    <h1 class="text-4xl font-bold mb-8 text-center">Your Favourites</h1>
    <div v-if="favItems.length > 0" class="space-y-6">
      <div
        v-for="(item, index) in favItems"
        :key="index"
        class="flex items-center p-4 border rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 relative"
      >
        <img :src="item.image" alt="Product Image" class="w-32 h-32 mr-6 rounded-md" />
        <div class="flex-1">
          <h2 class="text-xl font-bold">{{ item.title }}</h2>
          <p class="text-lg font-semibold text-gray-800">Price: ${{ item.price }}</p>
          <button
            @click="addToCart(item)"
            class="btn mt-4">
            Add to Cart
          </button>
        </div>
        <button
          @click="removeFromFav(index)"
          class="absolute top-2 right-2 text-red-500 hover:text-red-700"
        >
          <span class="material-icons">close</span>
        </button>
      </div>
    </div>
    <div v-else class="text-center text-gray-500 text-lg">No items in favourites</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { showToast } from '@/composables/toast';
import { useCart } from '@/composables/state'; 

const favItems = ref([]);
const cart = useCart();

// Load favourite items from local storage
const loadFavItems = () => {
  if (typeof window !== 'undefined') {
    const items = JSON.parse(localStorage.getItem('fav')) || [];
    favItems.value = items; 
  }
};

// Add item to cart with validation
const addToCart = (item) => {
  if (typeof window !== 'undefined') {
    const cartItem = {
      image: item.image,
      price: item.price,
      title: item.title,
      id: item.id,
      quantity: 1,
    };

    const currentCart = cart.value;

    // Check if the product is already in the cart
    const productExists = currentCart.some(cartItem => cartItem.id === item.id);

    if (productExists) {
      currentCart.forEach(cartItem => {
        if (cartItem.id === item.id) {
          cartItem.quantity += 1; // Increment quantity
        }
      });
      showToast('info', `${item.title} quantity updated in the cart`);
    } else {
      currentCart.push(cartItem);
      showToast('success', `${item.title} added to the cart`);
    }

    // Update the reactive state
    cart.value = currentCart;

    // Save the updated cart back to local storage
    localStorage.setItem('cart', JSON.stringify(currentCart));
  }
};

// Remove item from favourites
const removeFromFav = (index) => {
  if (typeof window !== 'undefined') {
    const updatedFav = favItems.value.filter((_, i) => i !== index);
    localStorage.setItem('fav', JSON.stringify(updatedFav));
    favItems.value = updatedFav; 
  }
};

onMounted(loadFavItems);
</script>

<style scoped>
img {
  max-width: 100px; /* Ensure images are not too large */
}

button {
  cursor: pointer;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .container {
    padding: 16px; /* Adjust padding for smaller screens */
  }

  h1 {
    font-size: 2rem; /* Adjust heading size */
  }

  .flex-1 {
    margin-left: 1rem; /* Add spacing between text and image on smaller screens */
  }
}
</style>