<template>
  <div class="card text-center flex flex-col items-center">
    <NuxtLink :to="`/products/${product.id}`">
      <img :src="product.image" class="thumb" alt="Product Image" />
    </NuxtLink>
    <NuxtLink :to="`/products/${product.id}`">
      <p class="font-bold text-gray-800 mt-2">{{ product.title }}</p>
    </NuxtLink>
    <div class="rating">
      <span class="text-gray-800 font-semibold">
        Rating: {{ product.rating.rate }}
      </span>
      <span class="text-gray-500"> ({{ product.rating.count }} reviews)</span>
    </div>

    <p class="price">${{ product.price }}</p>
    <div class="flex gap-3">
      <button class="btn mt-4" @click="addToCart">Add to Cart</button>
      <button class="btn mt-4" @click="addToFav">Add to Favourite</button>
    </div>
  </div>
</template>

<script setup>
import Swal from 'sweetalert2';
import { useCart } from '@/composables/state'; 
const { product } = defineProps(['product']);
const cart = useCart();

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

    // Retrieve existing cart items from state
    const currentCart = cart.value;

    // Checking if the product is already in the cart
    const productExists = currentCart.some(item => item.id === cartItem.id);

    if (productExists) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
      });

      Toast.fire({
        icon: 'warning',
        title: 'Product already in cart',
      });
      return;
    }

    // Add the new item to the cart
    currentCart.push(cartItem);

    // Update the reactive state
    cart.value = currentCart;

    // Save the updated cart back to local storage
    localStorage.setItem('cart', JSON.stringify(currentCart));

    // Notify the user
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
    });

    Toast.fire({
      icon: 'success',
      title: 'Product added to cart',
    });
  }
};

const addToFav = () => {
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
      alert('The product is already in the favourites.');
      return; // Exit the function if the product is already in the favourites
    }

    // Add the new item to the favourites
    fav.push(favItem);

    // Save the updated favourites back to local storage
    localStorage.setItem('fav', JSON.stringify(fav));

    alert('Product added to favourites!');
  }
};
</script>

<style scoped>
.thumb {
  max-height: 200px;
  max-width: 100%;
  margin: 0 auto;
}

.card:hover {
  @apply transform scale-105;
}

.rating {
  margin: 10px 0;
  font-size: 1rem;
}

.price {
  font-size: 1.5rem;
  color: #333;
  font-weight: bold;
}
</style>