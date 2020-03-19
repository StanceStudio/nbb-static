<template>
  <div class="container pt-20 xl:pt-26">
    <h1
        class=" text-2xl sm:text-4xl lg:text-5xl xxl:text-6xl font-serif uppercase leading-none inline-block">{{ error.statusCode === 404 ? 'Page not found' : 'An error occurred' }}</h1>
        <div v-if="error.statusCode === 404" class="mt-10 md:text-lg xl:text-xl font-light">
            <p>Sorry, but the page you requested could not be found.</p>
        </div>
  </div>
</template>

<script>
export default {
  props: ['error'],
}
</script>