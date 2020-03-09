<template>
  <div class="bg-lavender antialiased font-sans leading-normal tracking-normal flex flex-col w-screen min-h-screen text-black">
    <Header />
    <main role="main">
      <nuxt />
    </main>
  </div>
</template>

<script>
import Header from '../components/Header';

export default {
  components: {
    Header
  }
};
</script>
