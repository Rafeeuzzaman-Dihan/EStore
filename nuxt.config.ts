// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  ssr:false ,

  app: {
    head: {
      title: 'Nuxt Mart',
      meta: [
        {name: 'description', content: 'Online Store'}
      ],
      link: [
        {rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons'}
      ]
    }
  },

  compatibilityDate: '2025-01-11'
})