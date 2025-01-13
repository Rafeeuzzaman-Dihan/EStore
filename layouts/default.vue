<template>
      <main class="container mx-auto p-6">
        <div>
          <Navbar />
        </div>
       <div>
        <slot />
       </div>
       <div>
          <Footer />
       </div>
      </main>

  </template>
  
  <script setup>
      import Navbar from '~/components/Navbar.vue';
      import Footer from '~/components/Footer.vue';
  </script>
  
  <style scoped>
  .router-link-exact-active {
    color: blueviolet;
  }
  </style>