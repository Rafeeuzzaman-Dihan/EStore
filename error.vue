<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="text-center">
        <h1 class="text-6xl font-bold text-red-600">{{ errorCode }}</h1>
        <p class="mt-4 text-xl text-gray-700">
          {{ errorMessage }}
        </p>
        <div class="mt-6">
          <nuxt-link to="/" class="btn">Go to Home</nuxt-link>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps(['error']);
  const errorCode = props.error.status || 404;
  const errorMessage = props.error.message || 'Page Not Found';
  </script>
  
  <style scoped>
  </style>