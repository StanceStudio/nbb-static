<template>
  <div class="wrapper">
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
  },
};
</script>
