<template>
  <div class="product-details">
    <div class="card">
      <div class="relative">
        <span 
          class="material-icons heart-icon" 
          @click="toggleFav"
          :class="{ 'filled': isFav }"
        >
          favorite
        </span>
        <NuxtLink :to="`/products/${product.id}`">
          <img :src="product.image" class="product-image" alt="Product Image" />
        </NuxtLink>
      </div>
      <div class="details-container p-7">
        <h2 class="text-4xl font-bold mb-4">{{ product.title }}</h2>
        <div class="price-rating my-4 flex items-center">
          <p class="text-xl font-semibold mr-4">Price: ${{ product.price }}</p>
          <div class="rating flex items-center">
            <span v-for="star in 5" :key="star" class="star" :class="{ filled: star <= product.rating.rate }">★</span>
            <span class="text-xl ml-2">({{ product.rating.count }} reviews)</span>
          </div>
        </div>
        <button class="btn mt-4" @click="addToCart">Add to Cart</button>
        <h3 class="font-bold border-b-2 mb-4 pb-2 mt-7">Product Description:</h3>
        <p>{{ product.description }}</p>
      </div>
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
.product-details {
  max-width: 1200px; 
  margin: 0 auto; 
  padding: 20px; 
}

.card {
  background-color: #ffffff; /* White background for the card */
  border-radius: 10px; /* Rounded corners */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow */
}

.relative {
  position: relative; /* Enable positioning for the heart icon */
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

.product-image {
  width: auto; /* Make the image take full width of its container */
  height: auto; /* Maintain aspect ratio */
  max-height: 400px; /* Limit maximum height for the image */
}

.details-container {
  display: flex;
  flex-direction: column; /* Column layout for details */
  justify-content: flex-start; /* Align items to the top */
}

.price-rating {
  display: flex; /* Flex container for price and rating */
  justify-content: space-between; /* Space between price and rating */
} 

.rating {
  display: flex; /* Flex container for stars */
  align-items: center; /* Center vertically */
}

.star {
  font-size: 1.5rem; /* Adjust size as needed */
  color: gray; /* Default star color */
}

.star.filled {
  color: yellow; /* Color for filled stars */
}

.price {
  font-size: 1.5rem;
  color: #333;
  font-weight: bold;
}

.btn {
  background-color: #4CAF50; /* Green background */
  color: white; /* White text */
  border: none; /* Remove default border */
  padding: 10px 20px; /* Add padding */
  border-radius: 5px; /* Rounded corners */
  cursor: pointer; /* Pointer cursor on hover */
  transition: background-color 0.3s; /* Transition effect */
}

.btn:hover {
  background-color: #45a049; /* Darker green on hover */
}

@media (max-width: 768px) {
  .product-details {
    padding: 10px; /* Add padding on smaller screens */
  }

  .text-4xl {
    font-size: 2rem; /* Adjust title size on smaller screens */
  }

  .text-xl {
    font-size: 1.125rem; /* Adjust text size on smaller screens */
  }
}
</style>