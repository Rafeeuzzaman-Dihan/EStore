<template>
  <div class="container mx-auto p-6 flex flex-col lg:flex-row">
    <div class="w-full lg:w-2/3 mb-6 lg:mb-0">
      <h1 class="text-4xl font-bold mb-8 text-center">Your Cart</h1>
      <div v-if="cartItems.length > 0" class="space-y-6">
        <div
          v-for="(item, index) in cartItems"
          :key="index"
          class="flex items-center p-4 border rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300"
        >
          <img :src="item.image" alt="Product Image" class="w-32 h-32 mr-6 rounded-md" />
          <div class="flex-1">
            <h2 class="text-xl font-semibold">{{ item.title }}</h2>
            <p class="text-lg font-bold text-gray-800">Price: ${{ (item.price * item.quantity).toFixed(2) }}</p>
            <div class="flex items-center mt-4">
              <button @click="decreaseQuantity(index)" class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-1 px-2 rounded-l">
                -
              </button>
              <span class="mx-4 text-lg font-medium">{{ item.quantity }}</span>
              <button @click="increaseQuantity(index)" class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-1 px-2 rounded-r">
                +
              </button>
            </div>
          </div>
          <button
            @click="removeFromCart(index)"
            class="ml-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
          >
            Remove
          </button>
        </div>
      </div>
      <div v-else class="text-center text-gray-500 text-lg">No items in the cart.</div>
    </div>

    <div class="w-full lg:w-1/3 pl-0 lg:pl-6">
      <h2 class="text-2xl font-bold mb-4">Order Summary</h2>
      <div class="bg-white p-4 rounded shadow mb-4">
        <div class="flex justify-between mb-2">
          <span>Original Price:</span>
          <span>${{ originalPrice.toFixed(2) }}</span>
        </div>
        <div class="flex justify-between mb-2">
          <span>Tax:</span>
          <span>${{ tax.toFixed(2) }}</span>
        </div>
        <div class="flex justify-between mb-4 font-bold">
          <span>Total:</span>
          <span>${{ total.toFixed(2) }}</span>
        </div>
        
        <!-- Promo Code Section -->
        <div class="flex items-center mt-4">
          <input 
            type="text" 
            v-model="promoCode" 
            placeholder="Enter promo code" 
            class="border border-gray-300 p-2 rounded w-full mr-2"
          />
          <button @click="applyPromo" class="bg-blue-500 text-white font-bold py-2 px-4 rounded">Apply</button>
        </div>
      </div>
      <button class="bg-blue-500 text-white font-bold py-2 px-4 rounded w-full">Checkout</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';

const cartItems = ref([]);
const promoCode = ref(''); // Promo code state

// Load cart items from local storage
const loadCartItems = () => {
  if (typeof window !== 'undefined') {
    const items = JSON.parse(localStorage.getItem('cart')) || [];
    cartItems.value = items;
  }
};

// Increase item quantity
const increaseQuantity = (index) => {
  cartItems.value[index].quantity++;
  updateCart();
};

// Decrease item quantity
const decreaseQuantity = (index) => {
  if (cartItems.value[index].quantity > 1) {
    cartItems.value[index].quantity--;
    updateCart();
  }
};

// Update cart items in local storage
const updateCart = () => {
  localStorage.setItem('cart', JSON.stringify(cartItems.value));
};

// Remove item from cart
const removeFromCart = (index) => {
  if (typeof window !== 'undefined') {
    cartItems.value.splice(index, 1);
    updateCart();
  }
};

// Calculate total values
const originalPrice = computed(() => {
  return cartItems.value.reduce((total, item) => total + item.price * item.quantity, 0);
});

const taxRate = 0.05; // tax rate of 5%
const tax = computed(() => {
  return originalPrice.value * taxRate;
});

const total = computed(() => {
  return originalPrice.value + tax.value;
});

// Dummy function for applying promo code
const applyPromo = () => {
  if (promoCode.value) {
    alert(`Promo code "${promoCode.value}" applied! (This is a dummy function)`);
    promoCode.value = ''; // Clear the input after applying
  } else {
    alert('Please enter a promo code.');
  }
};

onMounted(loadCartItems);
</script>

<style scoped>
img {
  max-width: 100px;
}

button {
  cursor: pointer;
}
</style>